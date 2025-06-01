from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
import uuid
from django.utils.timezone import now
from uuid import uuid4
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

# Custom registration model // to create or register new user

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, default="")
    role = models.CharField(choices=[('buyer', 'Buyer'), ('seller', 'Seller')], max_length=10, default="buyer")
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(choices=[('male', 'Male'), ('female', 'Female')], max_length=10, default="male")
    country = models.CharField(max_length=100, default="")
    company_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255) 
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    objects = CustomUserManager() 

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_set",
        blank=True,
        help_text="The groups this user belongs to."
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions",
        blank=True,
        help_text="Specific permissions for this user."
    )
    def __str__(self):
        return self.email


#####################################################################################################################################

# product details for plants // plant model for plants details

class PlantPurchase(models.Model):
    PLANT_CATEGORIES = [
        ('Indoor', 'Indoor'),
        ('Outdoor', 'Outdoor'),
        ('Medicinal', 'Medicinal'),
    ]
    PLANT_SIZES = [
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),
    ]
    plant_image = models.ImageField(upload_to='plant_images/')
    plant_name = models.CharField(max_length=255)
    plant_category = models.CharField(max_length=50, choices=PLANT_CATEGORIES)
    plant_size = models.CharField(max_length=10, choices=PLANT_SIZES)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_charge = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    protection_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Optional")
    total_payable = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='plant_purchases', default=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    is_notified = models.BooleanField(default=False) 
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='plant_purchases_buyer', default=True)
    def save(self, *args, **kwargs):
        if not self.delivery_charge:
            self.delivery_charge = 50.00 if self.quantity <= 3 else 100.00

        protection_fee = self.protection_fee if self.protection_fee else 0.00
        self.total_payable = (self.price * self.quantity) + self.delivery_charge + protection_fee

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.plant_name} - {self.quantity} pcs"



class PlantPayment(models.Model):
    PAYMENT_METHODS = [
        ('COD', 'Cash on Delivery'),
        ('Card', 'Card Payment'),
    ]
    
    PAYMENT_STATUS = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]

    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='Pending')
    cardholder_name = models.CharField(max_length=100, blank=True, null=True)
    card_number = models.CharField(max_length=16, blank=True, null=True)
    expiry_date = models.CharField(max_length=7, blank=True, null=True)
    cvv = models.CharField(max_length=4, blank=True, null=True)

    def __str__(self):
        return f"Payment {self.payment_method} - {self.payment_status}"
    
    def _str_(self):
        return f"** ** ** {self.card_number}"

#########################################################################################################

class PlantOrder(models.Model):
    STATUS = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    ]

    order_id = models.CharField(max_length=255)  
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    plant = models.ForeignKey(PlantPurchase, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.OneToOneField(PlantPayment, on_delete=models.CASCADE, related_name='order', default=True)
    order_date = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(CustomUser, related_name='seller_orders', on_delete=models.CASCADE) 
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=True) 

    status = models.CharField(max_length=10, choices=STATUS, default='Pending')  
    quantity = models.PositiveIntegerField(default=1)  
    company_name = models.CharField(max_length=255, default=True)  
    is_replacement = models.BooleanField(default=False)  
   
    def __str__(self):
        return f"Order {self.order_id} - {self.plant.plant_name}"

    @staticmethod
    def generate_order_id():
        """Generate a unique order ID using the current date and time + UUID"""
        return f"ORD{now().strftime('%Y%m%d%H%M%S')}{uuid4().hex[:4]}"
    
    
    ##############################################################################################################################

    # Cart model for add plant prodcut to the cart // this section describe for the model to add cart the plant products

class PlantCart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    plant = models.ForeignKey(PlantPurchase, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username} - {self.plant.plant_name}"

    def total_price(self):
        return self.plant.price * self.quantity
    


#####################################################################################################################################
#####################################################################################################################################
    
# return model fro products

class PlantReturn(models.Model):
    RETURN_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Refunded', 'Refunded'),
    ]

    REFUND_STATUS_CHOICES = [
        ('Not Initiated', 'Not Initiated'),
        ('Processing', 'Processing'),
        ('Completed', 'Completed'),
        ('Rejected', 'Rejected'),
    ]

    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    order = models.ForeignKey(PlantOrder, on_delete=models.CASCADE)  
    plant = models.ForeignKey(PlantPurchase, on_delete=models.CASCADE)  
    payment = models.ForeignKey(PlantPayment, on_delete=models.CASCADE, default=True)  
    return_reason = models.TextField() 
    return_status = models.CharField(max_length=20, choices=RETURN_STATUS_CHOICES, default='Pending')  
    refund_status = models.CharField(max_length=20, choices=REFUND_STATUS_CHOICES, default='Not Initiated') 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Return Request - {self.id} | {self.buyer.email} | {self.return_status} | {self.refund_status}"
    
####################################################################################################################################
####################################################################################################################################

# Model for replace the products 
 
class PlantReplacementOrder(models.Model):
    order = models.ForeignKey(PlantOrder, on_delete=models.CASCADE)  
    product = models.ForeignKey(PlantPurchase, on_delete=models.CASCADE)  
    reason = models.TextField(max_length=100)  
    replacement_image = models.ImageField(upload_to='replacement_images/', null=True, blank=True)  
    replacement_status = models.CharField(max_length=100, default='Pending', choices=[('Pending', 'Pending'), ('Completed', 'Completed')])  # Status of replacement request
    reorder_status = models.CharField(
        max_length=100,
        default='Pending',
        choices=[
            ('Pending', 'Pending'),
            ('Replaced', 'Replaced'),
            ('Shipped', 'Shipped'),
            ('Delivered', 'Delivered')
        ])  
    payment = models.ForeignKey('PlantPayment', on_delete=models.SET_NULL, null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='replacement_requests')  

    def __str__(self):
        return f"Replacement for Order {self.order.id} - Status: {self.replacement_status}, Reorder Status: {self.reorder_status}"

################################################################################################################################################


