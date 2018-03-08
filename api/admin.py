from django.contrib import admin

from api.models import Collection, About, Press, Image, Home, StockList, Country, Settings, Menu


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'order', 'featured', 'published_at')
    list_filter = ('type', 'featured')

@admin.register(Press)
class PressAdmin(admin.ModelAdmin):
    list_display = ('order', 'title', 'is_published', 'image_thumb')


# @admin.register(Country)
# class CountryAdmin(admin.ModelAdmin):
#     list_display = ('name',)

@admin.register(StockList)
class StockListAdmin(admin.ModelAdmin):
    list_display = ('city', 'store_name')
    list_filter = ('city', 'country')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('order', 'image_thumb', 'collection')
    list_filter = ('collection',)
    list_select_related = ('collection',)


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        actions = super(AboutAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        actions = super(HomeAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('home',)

    def get_actions(self, request):
        actions = super(MenuAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_delete_permission(self, request, obj=None):

        return False

    def has_add_permission(self, request):
        return True


@admin.register(Settings)
class SettingsAdmin(admin.ModelAdmin):
    list_display = ('show_stock_list', 'show_language_menu', 'cover_image_thumb', 'contact_first_line', 'contact_second_line')

    def get_actions(self, request):
        actions = super(SettingsAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def has_delete_permission(self, request, obj=None):

        return False

    def has_add_permission(self, request):
        return False



# class ListFIlter(SimpleListFilter):
#     parameter_name ='collection'
#
#     def lookups(self, request, model_admin):
#         return (
#             ('col1', 'Collection1'),
#             ('col2', 'Collection2'),
#         )
#     def queryset(self, request, queryset):
#         return queryset.filter()