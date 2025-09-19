<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuickBooksToken extends Model
{
    public function callback(Request $request)
{
    $dataService = DataService::Configure([
        'auth_mode' => 'oauth2',
        'ClientID' => config('quickbooks.client_id'),
        'ClientSecret' => config('quickbooks.client_secret'),
        'RedirectURI' => config('quickbooks.redirect_uri'),
        'baseUrl' => "development"
    ]);

    $OAuth2LoginHelper = $dataService->getOAuth2LoginHelper();
    $accessToken = $OAuth2LoginHelper->exchangeAuthorizationCodeForToken(
        $request->code,
        $request->realmId
    );

    // Save to DB
    QuickBooksToken::updateOrCreate(
        ['realm_id' => $request->realmId],
        [
            'access_token' => $accessToken->getAccessToken(),
            'refresh_token' => $accessToken->getRefreshToken()
        ]
    );

    return redirect('/')->with('success', 'QuickBooks Connected!');
}
}
