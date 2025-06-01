from django.contrib import admin
from .models import CustomUser, PlantPurchase, PlantOrder, PlantPayment,PlantReturn,PlantReplacementOrder

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(PlantPurchase)
admin.site.register(PlantOrder)
admin.site.register(PlantPayment)
admin.site.register(PlantReturn)
admin.site.register(PlantReplacementOrder)

