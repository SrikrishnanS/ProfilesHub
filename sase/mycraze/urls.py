from django.conf.urls import patterns, url

from mycraze.views import TemplateView
from mycraze.views import LoginView
from mycraze.views import UserView

urlpatterns = patterns('',
	#url(r'^$', views.index, name='index'),
	url(r'^template/$', TemplateView.get_template_page, name='template'),
	url(r'^login/$', LoginView.get_login_page, name='login'),
	url(r'^logout/$', LoginView.get_logout_page, name='logout'),
	url(r'^profile-complete/$', LoginView.get_profile_completion_page, name='profile_complete'),
	url(r'^submit-profile/$', LoginView.submit_profile, name='submit_profile'),
	url(r'^user-resume/$', UserView.get_resume_page, name='resume'),
)
