<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\FinalInventory;
use App\Models\Inventory;
use Inertia\Inertia;
use App\Models\Port;
class CategoryController extends Controller
{public function index(Request $request)
{
    $search = $request->input('search');

    $query = Category::select('categories.id', 'categories.name', 'categories.image')
        ->withCount([
            // Count of related inventories (i.e., products)
            'inventories as products_count',

            // Count of related inventories that are also in final_inventories
            'inventories as final_inventory_count' => function ($q) {
                $q->join('final_inventories', 'inventories.id', '=', 'final_inventories.inventory_id');
            },
        ]);

    if ($search) {
        $query->where('categories.name', 'like', "%{$search}%");
    }

    $categories = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();
    $mainPort = Port::where('is_main', 1)->first();
    return Inertia::render('CategoryList', [
        'categories' => $categories,
        'title' => 'Product Category',
        'mainPort' => $mainPort,
    ]);
}


    public function create()
    {
        return Inertia::render('AddCategory', [
            'category' => null,
            'title' => 'Add Category',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('categories', $filename, 'public_uploads'); // stored in public/uploads/categories
        }


        Category::create([
            'name' => $request->name,
            'image' => $imagePath, // categories/filename.jpg
        ]);

        return redirect()->route('categories.index')->with('success', 'Category created.');
    }

    public function edit(Category $category)
    {
        return Inertia::render('AddCategory', [
            'category' => $category,
            'title' => 'Edit Category',
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('categories', $filename, 'public_uploads');
            $category->image = $imagePath;
        }

        $category->name = $request->name;
        $category->save();

        return redirect()->route('categories.index')->with('success', 'Category updated.');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
    

 public function inventoryProducts(Category $category)
{
    $inventory = FinalInventory::query()
        ->join('inventories', 'final_inventories.inventory_id', '=', 'inventories.id')
        // join invoice directly from final_inventories to guarantee we have invoice_id
        ->leftJoin('invoices', 'final_inventories.invoice_id', '=', 'invoices.id')
        ->where('inventories.category_id', $category->id)
        ->select(
            'final_inventories.id as final_inventory_id',
            'final_inventories.invoice_id as invoice_id',   // <-- send invoice_id
            'inventories.id as inventory_id',
            'inventories.name',
            'inventories.image',
            'inventories.size',
            'inventories.size_unit',
            'inventories.weight',
            'inventories.weight_unit',
            'final_inventories.quantity as total_product',   // per-row quantity
            'final_inventories.arrival_port as arrival_depo',// per-row depot
            'invoices.supplier',                              // invoice-level
            'invoices.on_transit'                             // invoice-level
        )
        ->orderBy('final_inventories.invoice_id')
        ->orderBy('inventories.name')
        ->paginate(50)
        ->withQueryString();

    $finalInventoryCount = FinalInventory::join('inventories', 'final_inventories.inventory_id', '=', 'inventories.id')
        ->where('inventories.category_id', $category->id)
        ->count();
         $mainPort = Port::where('is_main', 1)->first(['id','name']);

    return Inertia::render('InventoryByCategory', [
        'category' => $category->only(['id', 'name', 'image']),
        'inventory' => $inventory,
        'final_inventory_count' => $finalInventoryCount,
        'title' => "Products in {$category->name}",
         'mainPort' => $mainPort,
    ]);
}

public function destroyinventory($category, $id)
{
    $inventory = FinalInventory::findOrFail($id);
    $inventory->delete();

    return back()->with('success', 'Inventory item deleted successfully.');
}

}
