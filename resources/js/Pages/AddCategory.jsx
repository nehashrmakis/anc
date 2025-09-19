import { useForm, Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { usePage } from '@inertiajs/react';

export default function AddCategory({ category }) {
  const fileInput = useRef();
  const buttonOuterRef = useRef();
  const uploadedViewRef = useRef();

  const [preview, setPreview] = useState(category?.image ? `/uploads/${category.image}` : null);
 const [errorMsg, setErrorMsg] = useState('');
  const { errors } = usePage().props;
  const { data, setData, post, put, progress } = useForm({
    name: category?.name || '',
    image: null,
  });

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
  
    if (data.image) {
      formData.append('image', data.image);
    }
  
    if (category) {
      formData.append('_method', 'PUT'); // Laravel expects PUT method override
      router.post(route('categories.update', category.id), formData, {
        forceFormData: true,
      });
    } else {
      router.post(route('categories.store'), formData, {
        forceFormData: true,
      });
    }
  };
  

  return (
    <>
    <Header />
    <Sidebar />
      <Head title={category ? 'Edit Category' : 'Add Category'} />
      <main className="app-content p-lg-5 inventory-category">
        <div className="product-category-form mt-4">
          <form onSubmit={submit}>
            {/* Product Name */}
            <div className="row align-items-center mb-4">
              <div className="col-md-3">
                <label className="form-label">Category Name*</label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control in-prod-name"
                  placeholder="Category Name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div className="error-msg text-danger mt-1">{errors.name}</div>}
              </div>
            </div>

            {/* Product Image */}
            <div className="row align-items-center mb-4">
  <div className="col-md-3">
    <label className="form-label">Category Image</label>
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
    <div className="error-msg text-danger mt-1">{errorMsg || errors.image}</div>
  </div>
</div>

            {/* Submit Button */}
            <div className="varient-btn d-flex justify-content-end gap-2">
              <button type="submit" className="border-0 common_btn done-btn">
                {category ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
