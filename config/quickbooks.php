<?php

return [
    'client_id'       => env('QUICKBOOKS_CLIENT_ID'),
    'client_secret'   => env('QUICKBOOKS_CLIENT_SECRET'),
    'redirect_uri'    => env('QUICKBOOKS_REDIRECT_URI'),
    'environment'     => env('QUICKBOOKS_ENV', 'sandbox'), // or 'production'
    'scope'           => 'com.intuit.quickbooks.accounting',
    'baseUrl' => 'https://sandbox-quickbooks.api.intuit.com', // ✅ Correct

];
