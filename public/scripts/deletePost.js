const deletePost = (id) => {
  const button = document.getElementById(id);
  const postId = button.dataset.id;
  if (confirm("Are you sure you want delete this post?")) {
    axios
      .delete(`/post/delete/${postId}`)
      .then((response) => {
        const url = response.data.redirect;
        window.location.replace(url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
