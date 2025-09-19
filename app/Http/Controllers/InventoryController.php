<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryId = $request->query('cat');

        $query = Inventory::with('category');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $inventory = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();
        $categories = Category::all();

        return Inertia::render('InventoryList', [
            'inventory' => $inventory,
            'filters' => [
                'search' => $search,
                'cat' => $categoryId,
            ],
            'title' => 'Product Listing',
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('AddInventory', [
            'inventory' => null,
            'categories' => Category::select('id', 'name')->get(),
            'title' => 'Add Product',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'size' => 'required|string|max:255',
            'size_unit' => 'required|string|max:255',
            'weight' => 'required|string|max:255',
            'weight_unit' => 'required|string|max:255',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $imagePath = $request->file('image')->storeAs('inventories', $filename, 'public_uploads');
        }

        Inventory::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'image' => $imagePath,
            'size' => $request->size,
            'size_unit' => $request->size_unit,
            'weight' => $request->weight,
            'weight_unit' => $request->weight_unit,
        ]);

        return redirect()->route('inventory.index')->with('success', 'Inventory created.');
    }

    public function edit(Inventory $inventory)
    {
        return Inertia::render('AddInventory', [
            'inventory' => $inventory,
            'categories' => Category::select('id', 'name')->get(),
            'title' => 'Edit Product',
        ]);
    }

    public function update(Request $request, Inventory $inventory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'size' => 'nullable|string|max:255',
            'size_unit' => 'nullable|string|max:255',
            'weight' => 'nullable|string|max:255',
            'weight_unit' => 'nullable|string|max:255',
        ]);

        $data = $request->only([
            'name',
            'category_id',
            'size',
            'size_unit',
            'weight',
            'weight_unit',
        ]);

        if ($request->hasFile('image')) {
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $data['image'] = $request->file('image')->storeAs('inventories', $filename, 'public_uploads');
        }

        $inventory->update($data);

        return redirect()->route('inventory.index')->with('success', 'Inventory updated.');
    }

    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->delete();

        return redirect()->route('inventory.index')->with('success', 'Product deleted successfully.');
    }
}
