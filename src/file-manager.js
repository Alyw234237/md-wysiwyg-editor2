// https://github.com/GoogleChromeLabs/browser-nativefs

/* Usage Example */

// The imported methods will use the Native
// File System API or a fallback implementation.
import {
  fileOpen,
  directoryOpen,
  fileSave,
} from 'https://unpkg.com/browser-nativefs';

(async () => {
  // Open a file.
  const blob = await fileOpen({
    mimeTypes: ['image/*'],
  });

  // Open multiple files.
  const blobs = await fileOpen({
    mimeTypes: ['image/*'],
    multiple: true,
  });

  // Open all files in a directory,
  // recursively including subdirectories.
  const blobsInDirectory = await directoryOpen({
    recursive: true,
  });

  // Save a file.
  await fileSave(blob, {
    fileName: 'Untitled.png',
    extensions: ['.png'],
  });
})();

(async () => {

  /* Opening files */
  
  // Options are optional.
  const options = {
    // List of allowed MIME types, defaults to `*/*`.
    mimeTypes: ['image/*'],
    // List of allowed file extensions (with leading '.'), defaults to `''`.
    extensions: ['.png', '.jpg', '.jpeg', '.webp'],
    // Set to `true` for allowing multiple files, defaults to `false`.
    multiple: true,
    // Textual description for file dialog , defaults to `''`.
    description: 'Image files',
  };
  
  const blobs = await fileOpen(options);
  
  /* Saving files */
  
  // Options are optional.
  const options_ = {
    // Suggested file name to use, defaults to `''`.
    fileName: 'Untitled.txt',
    // Suggested file extensions (with leading '.'), defaults to `''`.
    extensions: ['.txt'],
  };
  
  // Optional file handle to save back to an existing file.
  // This will only work with the Native File System API.
  // Get a `FileHandle` from the `handle` property of the `Blob`
  // you receive from `fileOpen()` (this is non-standard).
  const handle = previouslyOpenedBlob.handle;
  
  await fileSave(someBlob, options_, handle);

})();

