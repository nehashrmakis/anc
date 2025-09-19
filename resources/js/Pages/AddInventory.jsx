import { useForm, Head, router,usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AddInventory({ inventory, categories }) {

const fileInput = useRef();
  const buttonOuterRef = useRef();
  const uploadedViewRef = useRef();

  const [preview, setPreview] = useState(inventory?.image ? `/uploads/${inventory.image}` : null);
  const [errorMsg, setErrorMsg] = useState('');
const { errors } = usePage().props;
  const { data, setData, post, put, progress } = useForm({
    name: inventory?.name || '',
    image: null,
    size: inventory?.size || '',
    size_unit: inventory?.size_unit || 'Feet',
    weight: inventory?.weight || '',
    weight_unit: inventory?.weight_unit || 'Kg/Each',
    category_id: inventory?.category_id || '',
  });
  
  
  

  const handleChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const allowed = ['gif', 'png', 'jpg', 'jpeg'];

    if (!allowed.includes(ext)) {
      setErrorMsg('Not an image...');
      return;
    }

    setErrorMsg('');
    setData('image', file);

    // Animate upload area
    buttonOuterRef.current.classList.add('file_uploading');
    setTimeout(() => {
      buttonOuterRef.current.classList.add('file_uploaded');
    }, 500);

    const uploadedFile = URL.createObjectURL(file);
    setTimeout(() => {
      setPreview(uploadedFile);
    }, 500);
  };

  const removeImage = () => {
    setPreview(null);
    setData('image', null);
    fileInput.current.value = null;

    // Remove animation classes
    buttonOuterRef.current.classList.remove('file_uploading', 'file_uploaded');
  };

  const submit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category_id', data.category_id);
    formData.append('size', data.size);
    formData.append('size_unit', data.size_unit);
    formData.append('weight', data.weight);
    formData.append('weight_unit', data.weight_unit);
  
    if (data.image) {
      formData.append('image', data.image);
    }
  
    if (inventory) {
      formData.append('_method', 'PUT');
      router.post(route('inventory.update', inventory.id), formData, {
        forceFormData: true,
      });
    } else {
      router.post(route('inventory.store'), formData, {
        forceFormData: true,
      });
    }
  };
  
  

  return (
    <>
      <Head title={inventory ? 'Edit Inventory' : 'Add Inventory'} />
    <Header />
    <Sidebar />
  
      <main className="app-content p-lg-5 inventory-category">
        <div className="product-category-form mt-4">
          <form onSubmit={submit}>
            {/* Category Dropdown */}
              <div className="row align-items-center mb-4">
                <div className="col-md-3">
                  <label className="form-label">Category</label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <div className="error-msg text-danger mt-1">{errors.category_id}</div>}
                </div>
              </div>
              {/* Product Name */}
             <div className="row align-items-center mb-4">
              <div className="col-md-3">
                <label className="form-label">Product Name</label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control in-prod-name"
                  placeholder="Product Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div className="error-msg text-danger mt-1">{errors.name}</div>}
              </div>
            </div>

            {/* Product Image */}
            <div className="row align-items-center mb-4">
  <div className="col-md-3">
    <label className="form-label">Product Image</label>
  </div>
  <div className="col-md-9">
    <div className="main_full">
      <div className="panel">
        <div className="button_outer" ref={buttonOuterRef}>
          {!preview && (
            <div className="btn_upload mb-2">
              <input
                type="file"
                id="upload_file"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
              />
              Upload Image
            </div>
          )}
          {progress && (
            <div className="processing_bar" style={{ width: `${progress.percentage}%` }} />
          )}
          <div className="success_box"></div>
        </div>
      </div>

      

      {preview ? (
        <div className="uploaded_file_view show" id="uploaded_view" ref={uploadedViewRef}>
          <img src={preview} alt="preview" className="mb-3"  />
          <span className="file_remove" onClick={removeImage}>X</span>
        </div>
      ) : (
        <img
          src="/assets/img/icons/upload-file.png"
          alt="upload-file"
          className="mb-3"
          style={{ maxHeight: '100px' }}
        />
      )}
    </div>
     <div className=" text-danger mt-1">{errorMsg || errors.image}</div>
  </div>
  
</div>
<div className="row mb-4">
  <div className="col-md-3">
    <label className="form-label mb-0">Product Variant</label>
  </div>

  <div className="col-md-9">
    <div className="row  variant-outer rounded-4 p-3 p-md-3 p-lg-4 mb-3 border">
        <div className="col-md-6">
          <div className="prod-variant">
            <div className="row g-2">
              <div className="col-12 col-md-2">
                <label className="form-label mb-0 mt-2 pt-1">Size</label>
              </div>
              <div className="col-6 col-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={data.size}
                  onChange={(e) => setData('size', e.target.value)}

                />
                {errors.size && <div className="error-msg text-danger mt-1">{errors.size}</div>}
              </div>
              <div className="col-6 col-md-5">
                <select
                  className="form-select"
                  value={data.size_unit}
                  onChange={(e) => setData('size_unit', e.target.value)}
                 >
                  <option value="Feet">Feet</option>
                  <option value="Meter">Meter</option>
                  <option value="Inch">Inch</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="prod-variant">
            <div className="row g-2">
              <div className="col-12 col-md-3">
                <label className="form-label mb-0 mt-2 pt-1">Weight</label>
              </div>
              <div className="col-6 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  value={data.weight}
                  onChange={(e) => setData('weight', e.target.value)}
                 />
                  {errors.weight && <div className="error-msg text-danger mt-1">{errors.size}</div>}
              </div>
              <div className="col-6 col-md-5">
                <select
                  className="form-select"
                  value={data.weight_unit}
                  onChange={(e) => setData('weight_unit', e.target.value)}
                 >
                  <option value="Kg/Each">Kg/Each</option>
                  <option value="Gram">Gram</option>
                  <option value="Ton">Ton</option>
                </select>
              </div>
            </div>
          </div>
        </div>
</div>
    
  </div>
</div>
  {/* Submit Button */}
            <div className="varient-btn d-flex justify-content-end gap-2">
             <button type="submit" className="border-0 common_btn done-btn">
                {inventory ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
