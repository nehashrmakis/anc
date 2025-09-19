<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use QuickBooksOnline\API\DataService\DataService;

class QuickBooksController extends Controller
{
    public function connect()
    {
        $dataService = DataService::Configure([
            'auth_mode' => 'oauth2',
            'ClientID' => config('quickbooks.client_id'),
            'ClientSecret' => config('quickbooks.client_secret'),
            'RedirectURI' => config('quickbooks.redirect_uri'),
            'scope' => 'com.intuit.quickbooks.accounting',
            'baseUrl' => 'development', // or 'production'
        ]);

        $OAuth2LoginHelper = $dataService->getOAuth2LoginHelper();
        $authUrl = $OAuth2LoginHelper->getAuthorizationCodeURL();

        return redirect($authUrl);
    }

    public function callback(Request $request)
{
    $code = $request->query('code');
    $realmId = $request->query('realmId');

    if (!$code || !$realmId) {
        return redirect('/')->with('error', 'Missing authorization code or realm ID');
    }

    $dataService = DataService::Configure([
        'auth_mode' => 'oauth2',
        'ClientID' => config('quickbooks.client_id'),
        'ClientSecret' => config('quickbooks.client_secret'),
        'RedirectURI' => config('quickbooks.redirect_uri'),
        'scope' => 'com.intuit.quickbooks.accounting',
        'baseUrl' =>  'development',
    ]);

    $OAuth2LoginHelper = $dataService->getOAuth2LoginHelper();

    $accessToken = $OAuth2LoginHelper->exchangeAuthorizationCodeForToken($code, $realmId);
    $dataService->updateOAuth2Token($accessToken);

    // ✅ Save the token to database
    \DB::table('quick_books_tokens')->updateOrInsert(
        ['realm_id' => $realmId],
        [
            'access_token' => $accessToken->getAccessToken(),
            'refresh_token' => $accessToken->getRefreshToken(),
            'expires_at' => $accessToken->getAccessTokenExpiresAt(),
           // 'refresh_token_expires_at' => $accessToken->getRefreshTokenExpiresAt(),
            'updated_at' => now(),
        ]
    );

    return redirect('/quickbooks/callback')->with('success', 'QuickBooks connected successfully!');
}
}
