(function () {
  const data = window.campusCircleData;
  const page = document.body.dataset.page;

  function renderStars(rating) {
    const rounded = Math.round(Number(rating));
    return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
  }

  function profileCard(profile) {
    const hobbyTags = profile.hobbies.map((hobby) => `<span class="tag">${hobby}</span>`).join("");
    const galleryItems = profile.gallery.map((item) => `
      <button class="gallery-item" type="button" data-work-src="${item.src}" data-work-title="${item.title}" data-work-owner="${profile.name}">
        <img src="${item.src}" alt="${item.title} by ${profile.name}">
        <span class="gallery-overlay">
          <strong>${item.title}</strong>
          <small>Click to view</small>
        </span>
      </button>
    `).join("");
    return `
      <article class="profile-card">
        <div class="profile-header">
          <img src="${profile.image}" alt="${profile.name} profile photo">
          <div>
            <div class="profile-name-row">
              <div>
                <h3>${profile.name}</h3>
                <p>${profile.title}</p>
              </div>
              <span class="price-badge">${profile.price}</span>
            </div>
            <div class="review-row">
              <span class="review-chip">${renderStars(profile.rating)} ${profile.rating}</span>
              <span class="review-chip">${profile.reviews} reviews</span>
            </div>
          </div>
        </div>
        <div class="profile-meta">
          <p>${profile.bio}</p>
          <div class="tag-row">${hobbyTags}</div>
          <div class="meta-row">
            <div class="meta-card">
              <strong>${profile.works}</strong>
              <span>submitted works</span>
            </div>
            <div class="meta-card">
              <strong>${profile.rating}/5</strong>
              <span>student rating</span>
            </div>
          </div>
          <div class="work-gallery-block">
            <div class="gallery-head">
              <strong>Work gallery</strong>
              <span>3 featured samples</span>
            </div>
            <div class="work-gallery">
              ${galleryItems}
            </div>
          </div>
          <div class="sample-work sample-review">
            <div>
              <strong>Past work highlight</strong>
              <p>${profile.review}</p>
            </div>
          </div>
          <div class="student-note">${profile.note}</div>
        </div>
      </article>
    `;
  }

  function mentorCard(mentor) {
    return `
      <article class="mentor-card">
        <img class="mentor-avatar" src="${mentor.image}" alt="${mentor.name} mentor photo">
        <div>
          <h3>${mentor.name}</h3>
          <p><strong>${mentor.subject}</strong> • ${mentor.mode}</p>
          <p>${mentor.description}</p>
          <div class="tag-row">
            <span class="tag">${mentor.price}</span>
            <span class="tag">${mentor.freeOption}</span>
            <span class="tag">${renderStars(mentor.rating)} ${mentor.rating}</span>
          </div>
        </div>
        <div class="mentor-actions">
          <span class="status-pill">${mentor.price}</span>
          <a class="button button-primary" href="#">Book session</a>
        </div>
      </article>
    `;
  }

  function marketplaceCard(item) {
    return `
      <article class="market-card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="market-meta">
          <span class="tag">${item.price}</span>
          <span class="tag">${item.alternate}</span>
          <span class="tag">${item.size}</span>
        </div>
        <p>${item.seller}</p>
        <a class="button button-secondary" href="#">View details</a>
      </article>
    `;
  }

  if (page === "home") {
    document.getElementById("featuredProfiles").innerHTML = data.featuredProfiles.map(profileCard).join("");
  }

  if (page === "profiles") {
    const allProfiles = [...data.featuredProfiles, ...data.extraProfiles];
    document.getElementById("allProfiles").innerHTML = allProfiles.map(profileCard).join("");
  }

  if (page === "mentors") {
    document.getElementById("mentorCards").innerHTML = data.mentors.map(mentorCard).join("");
  }

  if (page === "marketplace") {
    document.getElementById("marketplaceCards").innerHTML = data.marketplace.map(marketplaceCard).join("");
  }

  const lightbox = document.createElement("div");
  lightbox.className = "work-lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-backdrop" type="button" aria-label="Close image preview"></button>
    <div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="Work preview">
      <button class="lightbox-close" type="button" aria-label="Close preview">×</button>
      <img class="lightbox-image" src="" alt="">
      <div class="lightbox-copy">
        <strong class="lightbox-title"></strong>
        <span class="lightbox-owner"></span>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxTitle = lightbox.querySelector(".lightbox-title");
  const lightboxOwner = lightbox.querySelector(".lightbox-owner");

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".gallery-item");
    if (trigger) {
      lightboxImage.src = trigger.dataset.workSrc;
      lightboxImage.alt = trigger.dataset.workTitle;
      lightboxTitle.textContent = trigger.dataset.workTitle;
      lightboxOwner.textContent = trigger.dataset.workOwner;
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      return;
    }

    if (event.target.closest(".lightbox-close") || event.target.classList.contains("lightbox-backdrop")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
})();
