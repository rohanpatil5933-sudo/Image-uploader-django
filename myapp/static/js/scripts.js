// Confirmation for delete
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function (event) {
            if (!confirm("Are you sure you want to delete this image?")) {
                event.preventDefault();
            } else {
                alert("Image deleted successfully!");
            }
        });
    });

    // Upload success alert
    const uploadForm = document.querySelector('.form-container form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function () {
            alert("Image uploaded successfully!");
        });
    }
});
