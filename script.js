$(document).ready(function () {
  // Initialize Select2 for Skills and Languages
  $("#skills").select2();
  $("#languages").select2();

  // Sample data for Skill Categories (replace with your actual data)
  var skillCategories = [
    { id: 1, text: "Programming" },
    { id: 2, text: "Design" },
    { id: 3, text: "Marketing" },
  ];

  // Sample data for Skills (replace with your actual data)
  var programmingSkills = [
    { id: 1, text: "JavaScript" },
    { id: 2, text: "Python" },
    { id: 3, text: "Java" },
  ];
  var designSkills = [
    { id: 1, text: "Photoshop" },
    { id: 2, text: "Illustrator" },
    { id: 3, text: "Figma" },
  ];
  var marketingSkills = [
    { id: 1, text: "SEO" },
    { id: 2, text: "Social Media Marketing" },
    { id: 3, text: "Content Marketing" },
  ];

  // Populate Skill Category dropdown
  $.each(skillCategories, function (index, category) {
    $("#skillCategory").append(
      '<option value="' + category.id + '">' + category.text + "</option>"
    );
  });


  var skills = [
    { id: 1, text: "JavaScript" },
    { id: 2, text: "Python" },
    { id: 3, text: "Java" },
  ];
  $("#skills").select2({ data: skills });

  // Handle Skill Category change
  $('#skillCategory').on('change', function() {
    var selectedCategoryId = $(this).val();
    $('#subSkill').html('<option value="">Select Sub-Skill</option>'); 
    $('#subSkill').prop('disabled', true); // Disable sub-skill dropdown initially

    if (selectedCategoryId) {
        switch (selectedCategoryId) {
            case '1': // Programming
                $('#subSkill').select2({ data: programmingSkills });
                $('#subSkill').prop('disabled', false); // Enable sub-skill dropdown
                break;
            case '2': // Design
                $('#subSkill').select2({ data: designSkills });
                $('#subSkill').prop('disabled', false); 
                break;
            case '3': // Marketing
                $('#subSkill').select2({ data: marketingSkills });
                $('#subSkill').prop('disabled', false); 
                break;
            default:
                break;
        }
    }
});

  // Sample data for Languages (replace with your actual data)
  var languages = [
    { id: 1, text: "English" },
    { id: 2, text: "Bengali" },
    { id: 3, text: "Hindi" },
  ];

  // Populate Languages dropdown
  $("#languages").select2({ data: languages });

  // Add Education Row
  $(document).on("click", ".add-education", function () {
    var newRow = $(".education-row").first().clone();
    newRow.find("input").val("");
    $("#educationSection").append(newRow);
  });

  // Remove Education Row
  $(document).on("click", ".remove-education", function () {
    $(this).closest(".education-row").remove();
  });
  // Add Education Row
  $(document).on("click", ".add-education", function () {
    var newRow = $(".education-row").first().clone();
    newRow.find("input").val("");
    $("#educationSection").append(newRow);
  });

  // Remove Education Row
  $(document).on("click", ".remove-education", function () {
    $(this).closest(".education-row").remove();
  });

  // Add Work Experience Row
  $(document).on("click", ".add-experience", function () {
    var newRow = $(".work-experience-row").first().clone();
    newRow.find("input").val("");
    $("#workExperienceSection").append(newRow);
  });

  // Remove Work Experience Row
  $(document).on("click", ".remove-experience", function () {
    $(this).closest(".work-experience-row").remove();
  });

  //
  $.ajax({
    url: "https://bdapis.com/api/v1.2/divisions",
    method: "GET",
    success: function (response) {
      const divisions = response.data.map((division) => ({
        id: division.division.toLowerCase(),
        text: division.division,
      }));

      $("#division").select2({
        data: [{ id: "", text: "Select a division..." }].concat(divisions),
      });
    },
    error: function () {
      alert("Failed to load divisions.");
    },
  });
  $("#division").on("change", function () {
    const division = $(this).val();
    // alert(division)

    $("district")
      .val(null)
      .html('<option value="">Select a district...</option>')
      .prop("disabled", true)
      .trigger("change");

    if (division) {
      // If a division is selected

      $.ajax({
        url: `https://bdapis.com/api/v1.2/division/${division}`, // Assuming the API endpoint uses division name
        method: "GET",
        success: function (response) {
          const districts = response.data.map((district) => ({
            id: district.district.toLowerCase(),
            text: district.district,
          }));

          $("#district")
            .prop("disabled", false)
            .select2({
              data: [{ id: "", text: "Select a district..." }].concat(
                districts
              ),
            });
        },
        error: function () {
          alert("Failed to load districts.");
          $("#district").html(
            '<option value="">Error loading districts</option>'
          );
          $("#district").prop("disabled", true); // Disable district dropdown
        },
      });
    } else {
      // If no division is selected
      $("#district").html('<option value="">Select a district...</option>');
      $("#district").prop("disabled", true);
    }
  });
  // Fetch initial data for other dropdowns (if applicable)
  // ... (e.g., fetchSkills(), fetchLanguages())
});
