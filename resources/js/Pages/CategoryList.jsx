import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';

export default function CategoryList() {
  const { categories, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || '');
const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This category will be permanently deleted.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      router.delete(route('categories.destroy', id), {
        preserveScroll: true,
      });
    }
  });
};

  useEffect(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  }, [categories]); // Re-run tooltip initialization when categories change

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const params = {};
      if (search.trim() !== '') {
        params.search = search.trim();
      }

      router.get(route('categories.index'), params, {
        preserveState: true,
        replace: true,
      });
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <>
      <Head title="Category Listing" />
      <Header />
      <Sidebar />

      <main className="app-content p-lg-5 inventory-category">
        <div className="mt-2 prod-category mt-md-3 mt-lg-5 d-block d-md-flex d-lg-flex align-items-center gap-2 gap-lg-5 flex-md-row flex-lg-row">
          <div className="prod-category-btn mt-3 mt-lg-0 mt-md-0 mb-md-0 mb-4 mb-lg-0">
            <Link href={route('categories.create')} className="common_btn">
              Add New Category
            </Link>
          </div>

          <div className="header-search suplier-location mt-3 mt-lg-0 mt-md-0">
            <div className="input-group rounded-3">
              <input
                type="text"
                className="form-control border-0 ps-3"
                placeholder="Search Category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search Category"
              />
              <span className="input-group-text border-0 rounded-3 pe-3" id="search-bar">
                <i className="fa fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="prod-category-list-outer mt-3 mt-md-2 mt-lg-3 mb-2">
          <div className="prod-category-list d-flex flex-wrap gap-3 gap-lg-4 gap-lg-5 pb-3 pt-3">
            {categories.data.length === 0 && <p>No categories found.</p>}

            {categories.data.map((cat) => (
              <div key={cat.id} className="prod-category-box text-center">
                <div className="rounded-4 p-1 prod-category-img">
                  <img
                    src={cat.image ? `/uploads/${cat.image}` : 'assets/img/icons/upload-file.png'}
                    alt={cat.name}
                    className="img-fluid rounded-4"
                  />
                  <div className="overlay-btn rounded-4">
                    <Link
                      href={route('categories.edit', cat.id)}>
                      <i className="fa-solid fa-pen"></i>
                      <div className="prod-tooltip">Edit <span className='shape'></span></div>
                    </Link>

                    <button className="border-0" onClick={() => handleDelete(cat.id)}>
                      <i className="fa-solid fa-trash"></i>
                      <div className="prod-tooltip">Delete <span className='shape'></span></div>
                    </button>

                    <Link href={route('categories.inventoryProducts', cat.id)}>
                      <i className="fa-solid fa-info" title="Inventory"></i>
                      <span className="notify-icon"> {cat.final_inventory_count || 0}</span>
                      <div className="prod-tooltip">Inventory Listing<span className='shape'></span></div>
                    </Link>
                  </div>
                </div>

                <h4 className="mt-3">
                  <Link href={`http://103.164.67.227:8000/products?cat=${cat.id}`}>
                    {cat.name} ({cat.products_count || 0})
                  </Link>
                </h4>
              </div>
            ))}
          </div>

          {categories.links.length > 3 && (
            <div className="pagination mt-4 d-flex gap-2 flex-wrap">
              {categories.links.map((link, index) => (
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
