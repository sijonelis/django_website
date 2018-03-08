from ckeditor.fields import RichTextField
from django.conf import settings
from django.db import models


class Collection(models.Model):
    TYPE_COLLECTION = 1
    TYPE_CAMPAIGN = 2

    CollectionType = (
        (TYPE_COLLECTION, 'collection'),
        (TYPE_CAMPAIGN, 'campaign')
    )
    title = models.CharField(max_length=200, unique=True)
    featured = models.BooleanField(default=False)
    published_at = models.DateField()
    updated_at = models.DateField()
    type = models.IntegerField(choices=CollectionType, default=TYPE_COLLECTION)
    order = models.IntegerField(blank=False)

    @property
    def gallery_images(self):
        return ['http://%s/%s?imageslim&imageView2/2/w/1000' % (settings.QINIU_BUCKET_DOMAIN, image.image_url) for image in self.qiniu_images.all()]

    def __str__(self):
        return self.title


class Image(models.Model):

    # todo implement https://github.com/wangwenpei/django-qiniu
    # todo implement https://pypi.python.org/pypi/django-qiniu/0.1.7
    image_url = models.ImageField(max_length=200)
    collection = models.ForeignKey('Collection', related_name='qiniu_images', default=None)
    order = models.IntegerField(blank=False)

    def image_thumb(self):
        return '<img src="http://%s/%s?imageslim&imageView2/2/w/100/" width="100" />' % (settings.QINIU_BUCKET_DOMAIN, self.image_url)
    image_thumb.allow_tags = True


class About(models.Model):
    contents = RichTextField(default='')
    contents_cn = RichTextField(default='', blank=True)

    def __str__(self):
        return "About section contents"


class Home(models.Model):
    contents = RichTextField(default='')
    contents_cn = RichTextField(default='', blank=True)

    def __str__(self):
        return "Home section contents"


class StockList(models.Model):
    store_name = models.CharField(max_length=200, default='')
    store_name_cn = models.CharField(max_length=200, default='', blank=True)
    country = models.ForeignKey('Country', related_name='stores', default=None)
    city = models.CharField(max_length=200, default='')
    city_cn = models.CharField(max_length=200, default='', blank=True)
    address = models.CharField(max_length=200, default='')
    address_cn = models.CharField(max_length=200, default='', blank=True)
    phone = models.CharField(max_length=200, default='')
    phone_cn = models.CharField(max_length=200, default='', blank=True)

    def __str__(self):
        return self.country.name + ' ' + self.store_name


class Country(models.Model):
    name = models.CharField(max_length=200, default='')
    name_cn = models.CharField(max_length=200, default='', blank=True)
    order = models.IntegerField(default=0, blank=False)

    class Meta:
        verbose_name_plural = 'countries'

    def __str__(self):
        return self.name


class Press(models.Model):
    image = models.ImageField(max_length=200, default='')
    title = models.CharField(max_length=100, default='')
    title_cn = models.CharField(max_length=100, default='', blank=True)
    contents = models.TextField(max_length=10000, default='')
    contents_cn = models.TextField(max_length=10000, default='', blank=True)
    order = models.IntegerField(default=0, blank=False)
    is_published = models.BooleanField(default=True)

    def image_thumb(self):
        return '<img src="http://%s/%s?imageslim&imageView2/2/w/100/" width="100" />' % (settings.QINIU_BUCKET_DOMAIN, self.image)
    image_thumb.allow_tags = True

    class Meta:
        verbose_name_plural = 'presses'

    def __str__(self):
        return self.title


class Menu(models.Model):
    home = models.CharField(max_length=10, default='Home')
    home_cn = models.CharField(max_length=10, default='Home')
    collection = models.CharField(max_length=10, default='Collection')
    collection_cn = models.CharField(max_length=10, default='Collection')
    campaign = models.CharField(max_length=10, default='Campaign')
    campaign_cn = models.CharField(max_length=10, default='Campaign')
    stock_list = models.CharField(max_length=10, default='Stock list')
    stock_list_cn = models.CharField(max_length=10, default='Stock list')
    press = models.CharField(max_length=10, default='Press')
    press_cn = models.CharField(max_length=10, default='Press')
    about = models.CharField(max_length=10, default='About')
    about_cn = models.CharField(max_length=10, default='About')

    class Meta:
        verbose_name_plural = 'menu'

    def __str__(self):
        return 'menu'


class Settings(models.Model):
    show_stock_list = models.BooleanField(default=False)
    show_language_menu = models.BooleanField(default=False)
    cover_image = models.ImageField(max_length=200, default='')
    contact_first_line = models.CharField(max_length=33, default='')
    contact_second_line = models.CharField(max_length=33, default='')

    class Meta:
        verbose_name_plural = 'settings'

    def __str__(self):
        return 'settings'

    def cover_image_thumb(self):
        return '<img src="http://%s/%s?imageslim&imageView2/2/w/100/" width="100" />' % (settings.QINIU_BUCKET_DOMAIN, self.cover_image)

    cover_image_thumb.allow_tags = True
