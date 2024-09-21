  // Movies.js
  // 自适应页面大小，更新pagination.pageSize
  // 由于会产生不必要的闪烁和重复渲染，暂时不使用。
  // useEffect(() => {
  //   const calculatePageSize = () => {
  //     if (containerRef.current) {
  //       const containerWidth = containerRef.current.offsetWidth - 20; // 减去padding
  //       const itemWidth = 200+20; // 假设每个项目的宽度是200px
  //       const itemsPerRow = Math.floor(containerWidth / itemWidth);
  //       const newPageSize = itemsPerRow * Math.ceil(pagination.pageSize / itemsPerRow);
  //       setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
  //     }
  //   };

  //   calculatePageSize();
  //   window.addEventListener('resize', calculatePageSize);

  //   return () => {
  //     window.removeEventListener('resize', calculatePageSize);
  //   };
  // }, [pagination.pageSize]);