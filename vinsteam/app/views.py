from django.shortcuts import render
from django.core.cache import cache
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    cache.set('my_key', 'Привет я строка из Redis!', timeout=None)
    my_string = cache.get('my_key')
    context = {
        'my_string': my_string,
    }
    return render(request, 'index.html', context)


def get_string_from_redis(request):
    my_string = cache.get('my_key')
    if my_string is not None:
        return HttpResponse(my_string)
    else:
        return HttpResponse("Строка не найдена в Redis.")
