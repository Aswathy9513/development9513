from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import CustomUser, PlantPurchase, PlantCart,PlantOrder,PlantPayment,PlantReturn, PlantReplacementOrder
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render, get_list_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from django.http import HttpResponseForbidden
from django.utils.crypto import get_random_string
from django.http import HttpResponse
from django.urls import reverse  
from django.db import transaction 
from django.utils.crypto import get_random_string
from uuid import uuid4
import uuid
from django.utils.crypto import get_random_string
from django.utils import timezone
from django.utils.timezone import now
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist


User = get_user_model()

# index.html
def index(request):
    return render(request,"index.html")

# home.html
def home(request):
    return render(request,"home.html")

# blog.html
def blog(request):
    return render(request,"blog.html")

# faq_plant.html
def faq_plant(request):
    return render(request,"faq_plant.html")

# buyerhome-page.html
def buyerhome(request):
    return render(request, "buyerhome-page.html")

# contact.html
def contact(request):
    return render(request, "contact.html")

# sellerhome.html
def sellerhome(request):
    return render(request, "sellerhome.html")

# blog-indoor.html
def Indoor(request):
    return render(request, "blog - indoor.html")

# blog-outdoor.html
def Outdoor(request):
    return render(request, "blog - outdoor.html")

# blog-medicinal.html
def Medicinal(request):
    return render(request, "blog - medicin.html")

# blog-fertilizer.html
def Fertilizers(request):
    return render(request, "blog - fertilizer.html")

###############################################################################################################################
###############################################################################################################################
         
                        #   REGISTRATION FOR FUNCTION FRO USERS TO REGISTER 

# register.html

def register(request):
    if request.method == "POST":
        email = request.POST.get("email")
        full_name = request.POST.get("full_name")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")
        role = request.POST.get("role")
        phone_number = request.POST.get("phone_number")
        address = request.POST.get("address")
        gender = request.POST.get("gender")
        country = request.POST.get("country")
        company_name = request.POST.get("company_name", None)

        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect("register")

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Email already registered!")
            return redirect("register")

        user = CustomUser.objects.create(
            email=email,
            full_name=full_name,
            password=make_password(password), 
            role=role,
            phone_number=phone_number,
            address=address,
            gender=gender,
            country=country,
            company_name=company_name if role == "seller" else None
        )

        messages.success(request, "Registration successful! You can now log in.")
        return redirect("userlogin")

    return render(request, "register.html")


####################################################################################################################
##################################################################################################################################
                                      
                                #  LOGIN FUNCTION FOR LOGIN THE USER 

# userlogin.html

def userlogin(request):
    return render(request,"userlogin.html")

def login_view(request):
    if request.method == "POST":
        full_name = request.POST.get("full_name")
        password = request.POST.get("password")

        try:
            user = CustomUser.objects.get(full_name=full_name)

            if user.check_password(password):  
                login(request, user) 

                print(f"User Role: {user.role}")
                if hasattr(user, "role"):
                    if user.role == "buyer":
                        return redirect("buyerhome")
                    elif user.role == "seller":
                        return redirect("sellerhome")
                    else:
                        messages.error(request, "Invalid role.")
                        return redirect("userlogin")
                else:
                    messages.error(request, "Role not found.")
                    return redirect("userlogin")
            else:
                messages.error(request, "Invalid password.")
                return redirect("userlogin")

        except CustomUser.DoesNotExist:
            messages.error(request, "User not found.")
            return redirect("userlogin")

    return render(request, "buyerhome-page.html")

# logout

def user_logout(request):
    logout(request)
    return redirect('home')


#####################################################################################################################################
########################################################################################################################################

                                 #  PLANT PRODUCTS DELETE/ UPDATE FUNCTION //SELLER 


# delete product from plant products

def delete_plant(request, plant_id):
    if request.method == 'POST':
        product = get_object_or_404(PlantPurchase, id=plant_id)
        product.delete()
        return redirect('plantlist') 

# update form for plant details //  update_plant.html

def update_plant(request, id):
    product = get_object_or_404(PlantPurchase, id=id)
    if request.method == 'POST':
        product.plant_name = request.POST.get('plant_name')
        product.plant_category = request.POST.get('plant_category')
        product.plant_size = request.POST.get('plant_size')

        try:
            product.quantity = int(request.POST.get('quantity'))
            product.price = float(request.POST.get('price'))
            product.delivery_charge = float(request.POST.get('delivery_charge'))
            product.protection_fee = float(request.POST.get('protection_fee'))
        except ValueError:
            return render(request, 'update_plant.html', {'product': product, 'error': 'Invalid numeric input'})

        if request.FILES.get('plant_image'):
            product.plant_image = request.FILES.get('plant_image')

        product.save()
        return redirect('plantlist')
    return render(request, 'update_plant.html', {'product': product})

#################################################################################################################################
###################################################################################################################################
  
                          #  USER DETAILS DELETE/ UPDATE FUNCTION //SELLER 


# update_user.html to update the user form // update the user form if any changes

def update_user(request):
    if request.method == "POST":
        email = request.POST.get("email")
        username = request.POST.get("username")
        full_name = request.POST.get("full_name")
        phone_number = request.POST.get("phone_number")
        address = request.POST.get("address")
        gender = request.POST.get("gender")
        country = request.POST.get("country")
        company_name = request.POST.get("company_name") 

        try:
            user = CustomUser.objects.get(id=request.user.id)
            user.email = email
            user.username = username
            user.full_name = full_name
            user.phone_number = phone_number
            user.address = address
            user.gender = gender
            user.country = country

            if user.role == 'seller':
                user.company_name = company_name

            user.save()
            messages.success(request, "Your information has been updated successfully.")
            return redirect('userview')
        except CustomUser.DoesNotExist:
            messages.error(request, "User not found.")
    
    return render(request, "update_user.html")

@login_required
def view_profile(request):
    try:
        user_profile = CustomUser.objects.get(email=request.user.email)  
    except CustomUser.DoesNotExist:
        user_profile = None 

    return render(request, 'user_view.html', {'user_profile': user_profile})


############################################################################################################################################
#############################################################################################################################################

            #  THIS SECTION PROVIDE THE ADD CART SECTION FOR PLANTS TO PURCHASE and VIEW CART AND REMOVE CART PLANT PRODUCT

# plants-cart.html // add the plant product to the cart // buyer can add cart to plants

@login_required
def add_cart_plant(request, plant_id):
    plant = get_object_or_404(PlantPurchase, id=plant_id)

    try:
        cart_item = PlantCart.objects.get(user=request.user, plant=plant)
        cart_item.quantity += 1
        cart_item.save()
    except PlantCart.DoesNotExist:
        PlantCart.objects.create(user=request.user, plant=plant, quantity=1)
    return redirect('view_cart')

# add-cart-plant.html // view the plant products that added to the cart // buyer can view there add cart plants


@login_required
def view_cart(request):
    cart_items = PlantCart.objects.filter(user=request.user)
    return render(request, 'add-cart-plant.html', {'cart_items': cart_items})


# remove the plant prodcuts that add to the cart // remove the add cart plant

@login_required
def remove_from_cart(request, cart_item_id):
    try:
        cart_item = PlantCart.objects.get(id=cart_item_id, user=request.user)
        cart_item.delete()
        return redirect('view_cart')
    except PlantCart.DoesNotExist:
        return redirect('view_cart')
    
##########################################################################################################################################
####################################################################################################################################   

#    THIS SECTION FUNCTION CAN DO WHEN BUYER CAN VIEW THE SELLERS PRODUCT TO BUY, ADD CART AND VIEW CART 

# plant-cart.html - buyer to view the cart item add by seller

@login_required
def plant_cart_list(request):
    plants = PlantPurchase.objects.all()
    return render(request, 'plants-cart.html', {'plants': plants})



#########################################################################################################################################
#########################################################################################################################################

# THIS SECTION FUNCTION EXPLAIN THE SELLER CAN ADD THERE PLANT PRODUCTS AND ALSO VIEW THERE PLANT PRODCUTS THAT THEY ADDED  

# plants-details-added.html 



@login_required
def sell_plant_product(request):
    plants = PlantPurchase.objects.filter(seller=request.user)
    company_name = request.user.company_name 

    if request.method == 'POST':
        plant_image = request.FILES.get('plant_image')
        plant_name = request.POST.get('plant_name')
        plant_category = request.POST.get('plant_category')
        plant_size = request.POST.get('plant_size')
        quantity = int(request.POST.get('quantity', 1))
        price = float(request.POST.get('price', 0.00))
        protection_fee = float(request.POST.get('protection_fee', 0.00))
        delivery_charge = float(request.POST.get('delivery_charge', 0.00))
        total_payable = (price * quantity) + protection_fee + delivery_charge
        

        PlantPurchase.objects.create(
            seller=request.user,
            plant_image=plant_image,
            plant_name=plant_name,
            plant_category=plant_category,
            plant_size=plant_size,
            quantity=quantity,
            price=price,
            protection_fee=protection_fee,
            delivery_charge=delivery_charge,
            total_payable=total_payable,
            company_name=company_name
        )

    return render(request, "plants-details-added.html", {'plants': plants})


# plants-product-list.html 

@login_required
def plant_list_shop(request):
    plants = PlantPurchase.objects.filter(seller=request.user)
    return render(request, "plants-product-list.html", {'plants': plants})
    
####################################################################################################################################
#####################################################################################################################################
###########################################################################################################################


# BUYER SECTION TO BUY THE PRODUCTS

# plant-buy-now.html // to buy the products


def order_success(request, order_id):
    order = get_object_or_404(PlantOrder, id=order_id)
    
    print(f"Order Success Page - Order ID: {order.id}, Total Amount: {order.total_amount}")

    return render(request, "order-success.html", {"order": order})

# plant_buy_now.html

def buy_now(request, plant_id):
    plant = get_object_or_404(PlantPurchase, id=plant_id)
    user = request.user
    order = None

    if request.method == "POST":
        selected_quantity = int(request.POST.get("quantity", 1))  

        if selected_quantity > plant.quantity:
            messages.error(request, "Not enough stock available.")
            return redirect("plant-buy-now", plant_id=plant.id)
        total_amount = (plant.price * selected_quantity) + plant.delivery_charge + plant.protection_fee

        print(f"DEBUG: Plant Price: {plant.price}")
        print(f"DEBUG: Selected Quantity: {selected_quantity}")
        print(f"DEBUG: Delivery Charge: {plant.delivery_charge}")
        print(f"DEBUG: Protection Fee: {plant.protection_fee}")
        print(f"DEBUG: Total Amount: {total_amount}")

        payment_method = request.POST.get("payment_method")

        if payment_method == "COD":
            cardholder_name = card_number = expiry_date = cvv = ""
        else:
            cardholder_name = request.POST.get("cardholder_name", "")
            card_number = request.POST.get("card_number", "")
            expiry_date = request.POST.get("expiry_date", "")
            cvv = request.POST.get("cvv", "")

        payment = PlantPayment.objects.create(
            buyer=user,
            total_amount=total_amount,
            payment_method=payment_method,
            payment_status="Pending" if payment_method == "COD" else "Completed",
            cardholder_name=cardholder_name,
            card_number=card_number,
            expiry_date=expiry_date,
            cvv=cvv,
        )

        order = PlantOrder.objects.create(
            buyer=user,
            plant=plant,
            total_amount=total_amount,  
            payment=payment,
            order_id=PlantOrder.generate_order_id(),
            seller=plant.seller,
            status="Pending",
            quantity=selected_quantity, 
        )

        plant.quantity -= selected_quantity
        if plant.quantity == 0:
            plant.is_available = False
        plant.save()

        return redirect("order_success", order_id=order.id)

    return render(request, "plant-buy-now.html", {"plant": plant, "order": order})


# order details of buyer to buy the prodcuts 

def order_details(request, order_id):
    order = get_object_or_404(PlantPurchase, id=order_id) 
    return render(request, "plant-buy-now.html", {
        "order": order,
        "order_id": order.id, 
    })

#################################################################################################################################
#####################################################################################################################################


# SELLER SECTION FOR ORDER VIEW ORDER PURCHASE 


# seller_order.html

def seller_order_view(request):
    if request.user.role == 'seller':
        seller_orders = PlantOrder.objects.filter(
            plant__company_name=request.user.company_name
        )

        for order in seller_orders:
            order.seller_name = order.plant.seller.full_name
        return render(request, 'seller_order.html', {'seller_orders': seller_orders})
    else:
        return render(request, 'access_denied.html')


# to create order for seller 

def create_order(request):
    if request.method == "POST":
        buyer = request.user 
        plant_purchase = PlantPurchase.objects.get(id=request.POST.get('product_id'))
        total_amount = plant_purchase.price + plant_purchase.delivery_charge + plant_purchase.protection_fee
        
        
        order = PlantOrder.objects.create(
            order_id=PlantOrder.generate_order_id(),
            buyer=buyer,
            plant=plant_purchase,
            total_amount=total_amount,
            seller=plant_purchase.seller,
        )

        return redirect('order_details', order_id=order.id)

# update_product_status.html

def update_product_status(request, order_id):
    order = get_object_or_404(PlantOrder, id=order_id)

    if request.method == 'POST':
        order_status = request.POST.get('status')
        payment_status = request.POST.get('payment_status')
        order.status = order_status
        order.payment.payment_status = payment_status
        order.save()
        order.payment.save()
        return redirect('seller_order_view')

    return render(request, 'update_product_status.html', {'order': order})
######################################################################################################################################
######################################################################################################################################

# buyer_orders.html

def buyer_orders(request):
    buyer_orders = PlantOrder.objects.filter(buyer=request.user)
    
    context = {
        'buyer_orders': buyer_orders
    }
    return render(request, 'buyer_orders.html', context)





######################################################################################################################################

# out_of_stock.html 

@login_required
def out_of_stock_view(request):
    out_of_stock_products = PlantPurchase.objects.filter(seller=request.user, quantity=0)
    context = {
        'out_of_stock_products': out_of_stock_products
    }
    return render(request, 'out_of_stock.html', context)

#######################################################################################################################################
#######################################################################################################################################
###########################################################################################################################

# buyer_orders.html


def request_return(request, order_id):
    if request.method == 'POST':
        return_reason = request.POST.get('return_reason')
        order = get_object_or_404(PlantOrder, id=order_id, buyer=request.user)
        existing_return = PlantReturn.objects.filter(order=order).first()
        if existing_return:
            messages.warning(request, "You have already requested a return for this order.")
            return redirect('buyer_return_orders')
        PlantReturn.objects.create(
            buyer=request.user,
            order=order,
            plant=order.plant,
            payment=order.payment,
            return_reason=return_reason,
            return_status='Pending',
            refund_status='Not Initiated'
        )

        messages.success(request, "Your return request has been submitted.")
        return redirect('buyer_return_orders')
    return redirect('buyer_return_orders')

# buyer_return_orders.html

@login_required
def buyer_return_orders(request):
    """Displays all return requests made by the buyer"""
    returns = PlantReturn.objects.filter(buyer=request.user)
    return render(request, 'buyer_return_orders.html', {'returns': returns})



##################################################################################################################################
      

                #    RETURN PROCESS 

# seller_return_orders.html

@login_required
def seller_return_requests(request):
    """Displays return requests only for the seller's own products"""
    if request.user.role != 'seller':
        return redirect('home')
    seller_orders = PlantOrder.objects.filter(seller=request.user)
    company_name = seller_orders.first().seller.company_name if seller_orders.exists() else None
    if company_name:
        returns = PlantReturn.objects.filter(order__seller__company_name=company_name)
    else:
        returns = []
    return render(request, 'seller_return_orders.html', {'returns': returns})



@login_required
def update_return_status(request, return_id):
    """Allows the seller to update the return status and refund status"""
    plant_return = get_object_or_404(PlantReturn, id=return_id, order__seller=request.user)

    if request.method == "POST":
        return_status = request.POST.get("return_status")
        refund_status = request.POST.get("refund_status")
        plant_return.return_status = return_status
        plant_return.refund_status = refund_status
        plant_return.save()
        messages.success(request, "Return and refund status updated successfully.")
        return redirect('seller_return_requests')
    return redirect('seller_return_requests')

###################################################################################################################################################
##########################################################################################################################################
########################################################################################################################################
##########################################################################################################################################
############################################################################################################################################
############################################################################################################################################


# REPLACEMENT SECTION FOR BUYER AND SELLER 

def replace_product(request, order_id):
    order = get_object_or_404(PlantOrder, id=order_id)
    product = order.plant  
    if order.buyer != request.user:
        messages.error(request, "You can only replace products you have purchased.")
        return render(request, 'replace_product.html', {'order': order, 'product': product})

    if request.method == 'POST':
        reason = request.POST.get('reason')
        replacement_image = request.FILES.get('image')

        replacement_order = PlantReplacementOrder(
            order=order,
            product=product,
            reason=reason,
            replacement_image=replacement_image,
            buyer=request.user,
            seller=product.seller,  
            reorder_status='Pending', 
        )
        replacement_order.save()
        messages.success(request, "Your replacement request has been submitted successfully.")
        return redirect('buyerhome')  
    return render(request, 'replace_product.html', {'order': order, 'product': product})



###############################################################################################################################


def create_replacement_order(request, plant_id):
    plant = get_object_or_404(PlantPurchase, id=plant_id)

    if request.method == 'POST':
        replacement_image = request.FILES.get('image') 

        replacement_order = PlantReplacementOrder.objects.create(
            product=plant,
            buyer=request.user,
            replacement_status='Pending',  
            reorder_status='Pending', 
            replacement_image=replacement_image  
        )

        replacement_order.save()

        messages.success(request, "Replacement request created successfully.")
        return redirect('seller_product_view') 

    return render(request, 'create_replacement_order.html', {'plant': plant})



def seller_product_view(request):
    seller = request.user
    orders = PlantOrder.objects.filter(plant__seller=seller)
    replacement_requests = PlantReplacementOrder.objects.filter(product__seller=seller)

    for replacement in replacement_requests:
        replacement.buyer_info = replacement.product.buyer

    return render(request, 'seller_products.html', {
        'orders': orders,
        'replacement_requests': replacement_requests
    })




def update_replacement_status(request, replacement_order_id):
    replacement_order = get_object_or_404(PlantReplacementOrder, id=replacement_order_id)

    if replacement_order.product.seller != request.user:
        messages.error(request, "You can only update replacement requests for your products.")
        return redirect('seller_product_view')

    if request.method == 'POST':
        replacement_status = request.POST.get('replacement_status')
        reorder_status = request.POST.get('reorder_status')
        if replacement_status and reorder_status:
            replacement_order.replacement_status = replacement_status
            replacement_order.reorder_status = reorder_status
            replacement_order.save()

            messages.success(request, "Replacement and reorder statuses have been updated.")
        else:
            messages.error(request, "Both replacement status and reorder status must be selected.")

        return redirect('seller_product_view')  


@login_required
def buyer_replace_view(request):
  
    buyer = request.user
    orders = PlantOrder.objects.filter(buyer=buyer)
    replacement_requests = PlantReplacementOrder.objects.filter(buyer=buyer)
    
    return render(request, 'buyer_replace_view.html', {
        'orders': orders,
        'replacement_requests': replacement_requests
    })
######################################################################################################################################
####################################################################################################################################
####################################################################################################################################

# Forget password

def password_management(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        email = request.POST.get('email')

        try:
            user = CustomUser.objects.get(email=email)
        except ObjectDoesNotExist:
            messages.error(request, 'User not found. Please check the email entered.')
            return redirect('password_management')

        if action == "reset_password":
            old_password = request.POST.get('old_password')
            new_password = request.POST.get('new_password')
            confirm_password = request.POST.get('confirm_password')

            if not check_password(old_password, user.password):
                messages.error(request, 'Old password is incorrect.')
                return redirect('password_management')

            if new_password != confirm_password:
                messages.error(request, 'New passwords do not match.')
                return redirect('password_management')

            user.set_password(new_password)
            user.save()

            messages.success(request, 'Password updated successfully! Redirecting to login...')
            return redirect('password_management') 

        elif action == "forgot_password":
            new_password = request.POST.get('new_password')
            confirm_password = request.POST.get('confirm_password')

            if new_password != confirm_password:
                messages.error(request, 'New passwords do not match.')
                return redirect('password_management')

            user.set_password(new_password)
            user.save()

            messages.success(request, 'Password reset successful! Redirecting to login...')
            return redirect('password_management')

    return render(request, 'password_management.html')

########################################################################################################################################


# AI Views Functions

# from django.shortcuts import render
# from django.core.files.storage import FileSystemStorage
# from .ml_model.model import predict_image 


# def get_health_status(status):
#     """Returns the health status of the plant based on the model's prediction."""
#     status_lower = status.lower()

#     if "healthy" in status_lower:
#         return "✅ Healthy Plant"
#     elif "bacterial" in status_lower or "fungal" in status_lower or "virus" in status_lower:
#         return "⚠️ Infection Detected (Bacterial/Fungal/Viral)"
#     elif "spot" in status_lower or "spotted" in status_lower or "blight" in status_lower or "mildew" in status_lower:
#         return "🔴 Unhealthy Plant (Disease Detected)"
#     elif "wilt" in status_lower or "rot" in status_lower or "deficiency" in status_lower:
#         return "⚠️ Unhealthy Plant (Possible Deficiency or Disease)"
#     else:
#         return f"⚠️ Unknown Condition ({status})"  


# def predict(request):
#     if request.method == "GET":
#         return render(request, 'predict.html')

#     if request.method == "POST":
#         try:
#             if 'myfile' not in request.FILES:
#                 return render(request, 'predict.html', {'error': 'No file uploaded. Please upload an image.'})

#             uploaded_file = request.FILES['myfile']
#             print(uploaded_file)
#             print(uploaded_file)
#             print(uploaded_file)
#             top_prediction = predict_image(uploaded_file)
#             print(top_prediction)
#             print(top_prediction)
#             print(top_prediction)
#             context = {'predictions': top_prediction}

#             fs = FileSystemStorage()
#             filename = fs.save(uploaded_file.name, uploaded_file)
#             uploaded_file_url = fs.url(filename)
#             context['url'] = uploaded_file_url

#             return render(request, 'predict.html', context)

#         except Exception as e:
#             print("Error:", e)
#             return render(request, 'predict.html', {'error': f'Error processing image: {str(e)}'})


# from PIL import Image
# import numpy as np
# import io

# def preprocess_image(image_bytes):
#     """Preprocess uploaded image before sending it to the model."""
#     image = Image.open(io.BytesIO(image_bytes))
#     image = image.resize((224, 224)) 
#     image = np.array(image) / 255.0  
#     image = np.expand_dims(image, axis=0) 
#     return image


# #######################################################################################################################################