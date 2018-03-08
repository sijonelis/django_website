from rest_framework import serializers

from .models import Collection, About, Press, Home, StockList, Settings, Menu


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'title', 'gallery_images')


class CollectionPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'title', 'gallery_images_preview')


class ColectionNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('name',)


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ('contents', 'contents_cn')


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ('contents', 'contents_cn')


class PressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Press
        fields = ('title', 'contents', 'title_cn', 'contents_cn', 'image')


class StockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockList
        fields = ('city', 'store_name', 'address', 'phone')


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ('home', 'home_cn', 'collection', 'collection_cn', 'campaign', 'campaign_cn', 'stock_list',
                  'stock_list_cn', 'press', 'press_cn', 'about', 'about_cn')


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ('show_stock_list', 'show_language_menu', 'cover_image', 'contact_first_line', 'contact_second_line')

