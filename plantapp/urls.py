from django.urls import path
from .import views 


urlpatterns = [

    # index.html
    path('',views.index,name="index"),

    # home.html
    path('home/',views.home,name="home"),

    # blog.html
    path('blog/',views.blog,name="blog"),

     # contact.html
    path('contact/',views.contact,name="contact"),

    # faq_plant.html
    path('faq_plant/',views.faq_plant,name="faq_plant"),

     # buyerhome-page.html
    path("buyerhome/", views.buyerhome, name="buyerhome"),

    # sellerhome.html
    path("sellerhome/", views.sellerhome, name="sellerhome"),

    # userlogin.html
    path('userlogin/',views.userlogin,name="userlogin"),
    path("login_view/", views.login_view, name="login_view"),
    path('logout/', views.user_logout, name='logout'),

    # register.html
    path('register/',views.register,name="register"),

     # blog-indoor.html
    path('indoorblog/',views.Indoor,name="indoorblog"),

       # blog-ouydoor.html
    path('outdoorblog/',views.Outdoor,name="outdoorblog"),

       # blog-medicin.html
    path('medicinalblog/',views.Medicinal,name="medicinalblog"),

       # blog-fertilizer.html
    path('fertilizersblog/',views.Fertilizers,name="fertilizersblog"),

###############################################################################################################################

    # plant-details-added.html
    path('plantproduct/',views.sell_plant_product,name='plantproduct'),

    # plant-product-list.html
    path('plantlist/',views.plant_list_shop,name='plantlist'),

###########################################################################################################################



    # delete plants details 
    path('delete-plant/<int:plant_id>/', views.delete_plant, name='delete_plant'),

     # update_user.html 
    path('update_user/', views.update_user, name='update_user'),

    # user_view.html
    path('userview/',views.view_profile,name='userview'),

    # update_plant.html
    path('update_plant/<int:id>/', views.update_plant, name='update_plant'),


###########################################################################################################################
     # plant-cart.html
    path('plantcart/',views.plant_cart_list,name='plantcart'),

    #add-cart-plant.html
    path('add-to-cart/<int:plant_id>/', views.add_cart_plant, name='add-to-cart'),  
    path('view_cart/', views.view_cart, name='view_cart'),  
    path('remove-from-cart/<int:cart_item_id>/', views.remove_from_cart, name='remove_from_cart'),
    
##################################################################################################################################
#######################################################################################################################################
##########################################################################################################################################

                                            # BUY NOW URL VIEWS 
                                            



    path("buy-now/<int:plant_id>/", views.buy_now, name="buy_now"),
    path("order/details/<int:order_id>/", views.order_details, name="order_details"),

    path('order/success/<int:order_id>/', views.order_success, name='order_success'),

    path('seller/orders/', views.seller_order_view, name='seller_order_view'),
    path('update-status/<int:order_id>/', views.update_product_status, name='update_product_status'),
    path('create-order/', views.create_order, name='create_order'),
    path('my-orders/', views.buyer_orders, name='buyer_orders'),

    # out_of_stock+html 

    path("out-of-stock/", views.out_of_stock_view, name="out-of-stock"),

###############################################################################################################################


#  BUYER ORDER RETURN AND REFUND

    path('buyer/return-orders/', views.buyer_return_orders, name='buyer_return_orders'),  # Add this
    path('request-return/<int:order_id>/', views.request_return, name='request_return'),


#############################################################################################################################

# seller_return_orders.html 


    path('seller/returns/', views.seller_return_requests, name='seller_return_requests'),
    path('seller/update-return/<int:return_id>/', views.update_return_status, name='update_return_status'),


###################################################################################################################################

# Rplacement Urls 

    path('replace_product/<int:order_id>/', views.replace_product, name='replace_product'),
    path('seller/products/', views.seller_product_view, name='seller_product_view'),
    path('update_replacement_status/<int:replacement_order_id>/', views.update_replacement_status, name='update_replacement_status'),
    path('create_replacement/<int:plant_id>/', views.create_replacement_order, name='create_replacement_order'),
    path('buyer/orders/', views.buyer_replace_view, name='buyer_order_view'),

  # Reset Password 

    path('password-management/', views.password_management, name='password_management'),

##########################################################################################################################################

# AI Path 
  
    # path('predict/',views.predict, name='predict'),

##########################################################################################################################################

]





