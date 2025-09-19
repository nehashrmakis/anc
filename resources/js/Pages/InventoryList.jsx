import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

export default function InventoryList() {
  const { inventory, filters, categories  } = usePage().props;

  const queryParams = new URLSearchParams(window.location.search);
  const initialCat = queryParams.get('cat') || '';

  const [search, setSearch] = useState(filters?.search || '');
  const [cat, setCat] = useState(initialCat); 
  const selectedCategoryName = categories?.find(c => String(c.id) === cat)?.name || '';

 const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(route('inventory.destroy', id), {
        preserveScroll: true,
      });
    }
  });
};


  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const params = {};

      if (search.trim() !== '') {
        params.search = search.trim();
      }

      if (cat.trim() !== '') {
        params.cat = cat.trim(); 
      }

      router.get(route('inventory.index'), params, {
        preserveState: true,
        replace: true,
      });
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [search, cat]);

  return (
    <>
      <Head title="Product Listing" />
      <Header />
      <Sidebar />
      <main className="app-content p-lg-5 inventory-category">
        <div className="mt-2 prod-category mt-md-3 mt-lg-5 d-block d-md-flex d-lg-flex align-items-center gap-2 gap-lg-5 flex-md-row flex-lg-row">
          <div className="prod-category-btn mt-3 mt-lg-0 mt-md-0 mb-md-0 mb-4 mb-lg-0">
            <Link href={route('inventory.create')} className="common_btn">
              Add New Product
            </Link>
          </div>
          <div className="header-search suplier-location mt-3 mt-lg-0 mt-md-0">
            <div className="input-group rounded-3">
              <input
                type="text"
                className="form-control border-0 ps-3"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Product"
              />
              <span className="input-group-text border-0 rounded-3 pe-3" id="search-bar">
                <i className="fa fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>
        {selectedCategoryName && (
  <div className="mt-4 mb-3 catergory-heading">
    <div className="row">
      <div className="col-md-6 col-lg-7">
        <h2>Category: <strong>{selectedCategoryName}</strong></h2>
      </div>
      <div className="col-md-6 col-lg-5">
        <div className="category-btn text-end">
            <Link href={route('categories.index')} className="btn btn-secondary mt-2 ms-3">
            ← Back to Categories
          </Link>
        </div>
    </div>
  </div>
  </div>
)}

        <div className="prod-category-list-outer mt-3 mt-md-2 mt-lg-3 mb-2">
          <div className="prod-category-list d-flex flex-wrap gap-3 gap-lg-4 gap-lg-5 pb-3 pt-3">
            
            {inventory.data.length === 0 && <p>No Product found.</p>}

            {inventory.data.map((item) => (
              <div key={item.id} className="prod-category-box text-center">
                <div className="rounded-4 p-1 prod-category-img">
                  <img
                   src={item.image ? `/uploads/${item.image}` : 'assets/img/icons/upload-file.png'}
                    alt={item.name}
                    className="img-fluid rounded-4"
                  />
                  <div className="overlay-btn rounded-4">
                    <Link href={route('inventory.edit', item.id)}>
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                    <button className="border-0" onClick={() => handleDelete(item.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
                <h4 className="mt-3">
                  {item.name}
                  <br />
                  <small className="text-muted">{item.category?.name || 'No Category'}</small>
                </h4>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {inventory.links.length > 3 && (
            <div className="pagination mt-4 d-flex gap-2 flex-wrap">
              {inventory.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-3 py-1 border rounded ${
                    link.active ? 'bg-primary text-white' : 'bg-light text-dark'
                  } ${!link.url ? 'pointer-events-none text-muted' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
