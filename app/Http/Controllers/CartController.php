<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function store(Request $request)
    {
        // CartController@store
$cart = session()->get('cart', []);

$productId = $request->input('id');
$invoiceId = $request->input('invoice_id');

// Create a unique key (inventory + invoice + size + weight)
$cartKey = $productId . '_' . $invoiceId . '_' . $request->input('size') . '_' . $request->input('weight');

if (isset($cart[$cartKey])) {
    $cart[$cartKey]['quantity'] += $request->input('quantity', 1);
} else {
    $cart[$cartKey] = [
        'id' => $productId,
        'invoice_id' => $invoiceId,
        'name' => $request->input('name'),
        'size' => $request->input('size'),
        'size_unit' => $request->input('size_unit'),
        'weight' => $request->input('weight'),
        'weight_unit' => $request->input('weight_unit'),
        'arrival_depo' => $request->input('arrival_depo'),
        'quantity' => $request->input('quantity', 1),
    ];
}
//Log::info('CartController@store request data', $request->all());

 session()->put('cart', $cart);

        return redirect()->route('cart.index');
    }

    public function confirm()
    {
        $cart = session()->get('cart', []);

        return Inertia::render('ConfirmOrderList', [
            'cart' => array_values($cart),
        ]);
    }

    public function clear()
    {
        session()->forget('cart');
        return redirect()->back()->with('success', 'Cart cleared.');
    }
   public function destroy($id)
{
    $cart = session()->get('cart', []);

    if (isset($cart[$id])) {
        unset($cart[$id]);
        session()->put('cart', $cart);
    }

    return redirect()->route('cart.index')->with('success', 'Item removed from cart.');
}
}
