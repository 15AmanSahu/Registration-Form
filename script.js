<script>
    document.getElementById("registrationForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this); // Create FormData object from form
        const url = this.action; // Get form action URL

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json(); // Assuming backend sends JSON response
            if (result.success) {
                window.location.href = "/success"; // Redirect to success page
            } else {
                alert(result.message); // Show error message
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later."); // Basic error handling
        }
    });
</script>
