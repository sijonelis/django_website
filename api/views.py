from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Collection, About, Press, Home, Country, StockList, Settings, Menu
from .serializers import CollectionSerializer, AboutSerializer, \
    PressSerializer, HomeSerializer, StockListSerializer, SettingsSerializer, MenuSerializer


def menu(request):
    featured_collections = Collection.objects.all().filter(type=Collection.TYPE_COLLECTION, featured=True).order_by(
        'order')
    featured_campaigns = Collection.objects.all().filter(type=Collection.TYPE_CAMPAIGN, featured=True).order_by('order')

    collection_serializer = CollectionSerializer(featured_collections, many=True)
    campaign_serializer = CollectionSerializer(featured_campaigns, many=True)
    response = {'collections': collection_serializer.data, 'campaigns': campaign_serializer.data}
    return JsonResponse(response
                        )


@csrf_exempt
@require_http_methods(["GET"])
def get_page_data(request):
    home = Home.objects.first()
    featured_collections = Collection.objects.all().filter(type=Collection.TYPE_COLLECTION, featured=True).order_by(
        'order')
    featured_campaigns = Collection.objects.all().filter(type=Collection.TYPE_CAMPAIGN, featured=True).order_by('order')
    about = About.objects.first()
    press = Press.objects.all().filter(is_published=True).order_by('order')
    menu_text = Menu.objects.first()
    settings = Settings.objects.first()

    language = request.GET['lang']

    home_serializer = HomeSerializer(home, context={'lang': language})
    collection_serializer = CollectionSerializer(featured_collections, many=True)
    campaign_serializer = CollectionSerializer(featured_campaigns, many=True)
    about_serializer = AboutSerializer(about, context={'lang': language})
    press_serializer = PressSerializer(press, many=True, context={'lang': language})
    menu_serializer = MenuSerializer(menu_text, context={'lang': language})
    settings_serializer = SettingsSerializer(settings)

    home_data = home_serializer.data
    about_data = about_serializer.data
    press_data = press_serializer.data
    menu_data = menu_serializer.data

    language = 'en'

    if request.GET['lang'] == 'cn':
        language = 'cn'
        home_data['contents'] = home_data['contents_cn']
        about_data['contents'] = about_data['contents_cn']
        for key in range(0, press_data.__len__()):
            press_data[key]['contents'] = press_data[key]['contents_cn']
            press_data[key]['title'] = press_data[key]['title_cn']
        menu_data['home'] = menu_data['home_cn']
        menu_data['collection'] = menu_data['collection_cn']
        menu_data['campaign'] = menu_data['campaign_cn']
        menu_data['stock_list'] = menu_data['stock_list_cn']
        menu_data['press'] = menu_data['press_cn']
        menu_data['about'] = menu_data['about_cn']

    del home_data['contents_cn']
    del about_data['contents_cn']
    for key in range(0, press_data.__len__()):
        del press_data[key]['contents_cn']
        del press_data[key]['title_cn']
    del menu_data['home_cn']
    del menu_data['collection_cn']
    del menu_data['campaign_cn']
    del menu_data['stock_list_cn']
    del menu_data['press_cn']
    del menu_data['about_cn']

    data = {
        'home_block': home_data,
        'collections': collection_serializer.data,
        'campaigns': campaign_serializer.data,
        'press_block': press_data,
        'about_block': about_data,
        'menu': menu_data,
        'settings': settings_serializer.data,
        'language': language
    }
    if settings.show_stock_list:
        stock_block = [
            {'country': country.name,
             'stores': StockListSerializer(StockList.objects.filter(country=country), many=True).data}
            for country in Country.objects.all().order_by('order')
        ]
        data['stock_block'] = stock_block
    response = {'data': data}
    return JsonResponse(response, status=200)
