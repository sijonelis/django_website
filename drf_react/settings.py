import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

DEBUG = os.environ.get('DEBUG', 'on') == 'on'

ALLOWED_HOSTS = ['']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = ''

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    # third party apps
    'ckeditor',
    'rest_framework',
    'webpack_loader',
    # 'photologue',
    'sortedm2m',
    # local apps
    'api',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'drf_react.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'drf_react.wsgi.application'

####
# DATABASE
####

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

####
# INTERNATIONALIZATION
####

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

####
# STATIC FILES
####

STATIC_URL = '/static/'

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'),
)

####
# MEDIA FILES
MEDIA_ROOT = os.path.join(BASE_DIR, 'assets', 'media')
MEDIA_URL = '/media/'
####

####
# WEBPACK
####

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

SITE_ID = 1

GALLERY_IMAGE_PREVIEW_LIMIT = 4

#qiniu upload params
QINIU_ACCESS_KEY = ''
QINIU_SECRET_KEY = '--'
QINIU_BUCKET_NAME = '8on8'
QINIU_BUCKET_DOMAIN = '.bkt.clouddn.com'
QINIU_SECURE_URL = False

DEFAULT_FILE_STORAGE = 'qiniustorage.backends.QiniuStorage'