const base_host = "https://www.ishtari.com/";
const main_urls =

{
    "search": base_host + "index.php?route=webapi/autosuggest&json=5050&term=",
    "cart": base_host + "motor/v1/index.php?route=checkout/cart/cart",
    "menu": base_host + "/functions/menu_en.json",
    "top-categories": base_host + "/functions/top_categories_en.json",
    "category": base_host + "motor/v1/index.php?route=catalog/category&path=",
    "manufacturer": base_host + "motor/v1/index.php?route=catalog/manufacturer&manufacturer_id=",
    "seller": base_host + "motor/v1/index.php?route=catalog/seller&seller_id=",
    "filter": base_host + "motor/v1/index.php?route=catalog/filter_product",

    'fb_login': base_host + 'motor/v1/index.php?route=account/login/sociallogin',
    'coupon': base_host + 'motor/v1/index.php?route=checkout/cart/coupon',
    'checkout': base_host + "motor/v1/index.php?route=checkout/manual",
    'confirm_payment': base_host + 'motor/v1/index.php?route=checkout/payment_form',
    "login": base_host + "motor/v1/index.php?route=account/login/login",
    "forgot": base_host + "motor/v1/index.php?route=account/forgotten/forgotten",
    "check_login": base_host + "motor/v1/index.php?route=account/login/login",
    "log_out": base_host + "motor/v1/index.php?route=account/logout/logout",
    "get_info": base_host + "motor/v1/index.php?route=account/account/getAccount",
    "save_info": base_host + "motor/v1/index.php?route=account/account/saveAccount",
    "change_password": base_host + "motor/v1/index.php?route=account/account/changePassword",
    "list_orders": base_host + "motor/v1/index.php?route=account/order/orders",
    "get_order": base_host + "motor/v1/index.php?route=account/order/orders&id=",
    "whishlist": base_host + "motor/v1/index.php?route=account/wishlist/wishlist",
    "list_address": base_host + "motor/v1/index.php?route=account/address/address",
    'zones': base_host + 'motor/v1/index.php?route=account/zone/zone&country_id=118',
    'towns': base_host + 'motor/v1/index.php?route=account/town/town&zone_id=',
    "register": base_host + "motor/v1/index.php?route=account/register/register",
    "get-token": base_host + "motor/v1/index.php?route=token/new_token&grant_type=client_credentials",
    "custom-menu": base_host + "/functions/menu_en.json",
    "custom-footer": base_host + "/functions/footer_en.json",

    "algsearch": base_host + "motor/v1/index.php?route=catalog/fastsearch&key=",
    "home-content": base_host + "/motor/v1/index.php?route=common/widgets",
    "placeholder": "https://www.ishtari.com/functions/web_desktop_placeholder.html",
    "images-url": "https://www.ishtari.com/image/",
    "menu-images": "https://www.ishtari.com/image/",
    "get-category-data": base_host + "motor/v1/index.php?route=catalog/category&path=",
    "get-manufacturer-data": base_host + "motor/v1/index.php?route=catalog/manufacturer&manufacturer_id=",
    "get-seller-data": base_host + "motor/v1/index.php?route=catalog/seller&seller_id=",
    "get-product-data": base_host + "motor/v1/index.php?route=catalog/product&product_id=",
    'autocomplete_name': base_host + "motor/v1/index.php?route=account/address/autoComplete&filter_name=",
    'get_customer_by_phone': base_host + 'motor/v1/index.php?route=account/address/getCustomerByPhone&phone='
};
export default main_urls;