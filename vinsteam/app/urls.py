from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from app.views import index, get_string_from_redis


app_name = 'app'

get_string_from_redis
urlpatterns = [
    path('', index, name='index'),
    path('get_string_from_redis/',
         get_string_from_redis,
         name='get_string_from_redis'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
