function wxAdapter(config) {
  const { uploadFile, downloadFile, method, onProgressUpdate = () => void 0, ...rest } = config;

  if (uploadFile) {
    const uploadTask = wx.uploadFile(rest);
    uploadTask.onProgressUpdate(onProgressUpdate);
    return uploadTask;
  }

  if (downloadFile) {
    const downloadTask = wx.downloadFile(rest);
    downloadTask.onProgressUpdate(onProgressUpdate);
    return downloadTask;
  }

  return wx.request({ method, ...rest });
}

module.exports = wxAdapter;
