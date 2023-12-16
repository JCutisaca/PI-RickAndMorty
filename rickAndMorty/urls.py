from django.urls import path
from .views import get_character_by_id_view, user_view, post_fav, delete_fav
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'user', user_view.User_view, 'user')
router.register(r'character', get_character_by_id_view.Get_character_by_id_view, 'character')
router.register(r'fav', post_fav.Post_fav, 'fav')
router.register(r'delete', delete_fav.Delete_fav, 'fav/delete')

urlpatterns = router.urls