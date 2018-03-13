# from .authentication import EmailAuthBackend
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import list_route, detail_route
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime
import operator

from .serializer import UserSerializer, ListSerializer, ProcessSerializer, ProcessSerializerForList, \
    StudentSerializer
from .models import List, Student, Process


# from django.core import serializers


# Create your views here.


class LoginViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated,)

    # authentication_classes = (EmailAuthentication,)

    @list_route(methods=['post'])
    def get_user_info(self, request):
        username = request.data['email']
        password = request.data['password']
        # user = authenticate(self, username="root", password="abcdefgh")
        user = self.queryset.get(username=username)
        token = Token.objects.get_or_create(user=user)

        # login(request, user)

        if (user.is_staff):
            serializer = UserSerializer(user)
            return Response({'user_info': serializer.data, 'token': token[0].key, "is_staff": True})
        else:
            user = Student.objects.get(username=username)
            serializer = StudentSerializer(user)
            return Response({'user_info': serializer.data, 'token': token[0].key})


# class UserViewset(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     # permission_classes = (IsAdminUser,)
#     # authentication_classes = (BasicAuthentication, )
#     authentication_classes = (BasicAuthentication,)
#     permission_classes = (IsAdminUser,)
#     serializer_class = UserSerializer
#
#     def create(self, request, *args, **kwargs):
#         username = request.POST['username']
#         password = request.POST['password']
#         email = request.POST['email']
#         group = request.POST['group']
#
#         student = Student.objects.create_user(username=username, password=password, email=email, group=group)
#         # student.set_password(password)
#
#         if (student.group == "Fall"):
#             list = List.objects.filter(fall_due_date__isnull=False)
#         else:
#             list = List.objects.filter(winter_due_date__isnull=False)
#
#         for item in list:
#             Process(list=item, student=student).save()
#
#         return Response({"status": "SUCCESS"})


class ListViewset(viewsets.ModelViewSet):
    queryset = List.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUser,)
    serializer_class = ListSerializer

    def list(self, request, *args, **kwargs):
        task_name = request.GET.get('task_name', None)
        q_list = []
        if task_name:
            q_list.append(Q(list_name=task_name))
        due_date = request.GET.get('due_date', None)
        if due_date:
            try:
                due_date = datetime.strptime(due_date, '%Y-%m-%d')
                q_list.append(Q(Q(list__fall_due_date=due_date) | Q(list__winter_due_date=due_date)))
            except Exception as e:
                pass
        sort_by = request.GET.get('sort_by', 'list_name')
        order = request.GET.get('order', '')
        if sort_by:
            if len(q_list) > 0:
                list = self.queryset.filter(reduce(operator.and_, q_list)).order_by(order + sort_by)
            else:
                list = self.queryset.all().order_by(order + sort_by)
        else:
            if len(q_list) > 0:
                list = self.queryset.filter(reduce(operator.and_, q_list))
            else:
                list = self.queryset.all()
        serializer = ListSerializer(list, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if (serializer.data['fall_due_date']):
            fall_student = Student.objects.filter(group="Fall")

        if (serializer.data['winter_due_date']):
            winter_student = Student.objects.filter(group="Winter")

        if 'fall_student' in vars() and 'winter_student' in vars():
            student = fall_student | winter_student
        elif 'fall_student' in vars():
            student = fall_student
        elif 'winter_student' in vars():
            student = fall_student

        list = List.objects.get(list_name=serializer.data['list_name'])

        if 'student' in vars():
            for item in student:
                Process(list=list, student=item).save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def update(self, request, *args, **kwargs):
        old_list = List.objects.get(id=request.data['id'])

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        new_list = List.objects.get(id=request.data['id'])

        if old_list.fall_due_date == None and new_list.fall_due_date:
            fall_student = Student.objects.filter(group="Fall")
            for item in fall_student:
                Process(list=new_list, student=item).save()
        elif old_list.fall_due_date and new_list.fall_due_date == None:
            fall_student = Student.objects.filter(group="Fall")
            for item in fall_student:
                Process.objects.filter(student__id=item.id, list_id=new_list.id).delete()

        if old_list.winter_due_date == None and new_list.winter_due_date:
            winter_student = Student.objects.filter(group="Winter")
            for item in winter_student:
                Process(list=new_list, student=item).save()
        elif old_list.winter_due_date and new_list.winter_due_date == None:
            winter_student = Student.objects.filter(group="Winter")
            for item in winter_student:
                Process.objects.filter(student__id=item.id, list_id=new_list.id).delete()

        return Response(serializer.data)


class ProcessViewset(viewsets.ModelViewSet):
    queryset = Process.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = ProcessSerializer

    @list_route(methods=['get', 'post'], permission_classes=[IsAdminUser])
    def list_by_id(self, request):
        student_name = request.GET.get('student_email', None)
        q_list = []
        if student_name:
            q_list.append(Q(student__name__icontains=student_name))
        due_date = request.GET.get('due_date', None)
        if due_date:
            try:
                due_date = datetime.strptime(due_date, '%Y-%m-%d')
                q_list.append(Q(Q(list__fall_due_date=due_date) | Q(list__winter_due_date=due_date)))
            except Exception as e:
                pass
        list_name = request.GET.get('list_name', None)
        if list_name:
            q_list.append(Q(list__list_name=list_name))
        task_status = request.GET.get('task_status', None)
        if task_status:
            q_list.append(Q(status=task_status))
        _id = request.GET['id']
        if _id:
            q_list.append(Q(list__id=int(_id)))
        sort_by = request.GET.get('sort_by', 'student__first_name')
        order = request.GET.get('order', '')
        if sort_by:
            if len(q_list) > 0:
                list = self.queryset.filter(reduce(operator.and_, q_list)).order_by(order + sort_by)
            else:
                list = self.queryset.all().order_by(order + sort_by)
        else:
            if len(q_list) > 0:
                list = self.queryset.filter(reduce(operator.and_, q_list))
            else:
                list = self.queryset.all()
        serializer = ProcessSerializer(list, many=True)
        return Response(serializer.data)

    @list_route(methods=['get', 'post'])
    def student(self, request):
        list = self.queryset.filter(student__id=int(request.GET['id']))
        serializer = ProcessSerializerForList(list, many=True)
        return Response({'data': serializer.data})
