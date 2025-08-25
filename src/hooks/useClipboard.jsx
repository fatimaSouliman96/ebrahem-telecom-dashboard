import { useState } from "react";
const useClipboard = () =>
{
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };
  return { copySuccess, copyToClipboard, setCopySuccess };
};
export default useClipboard;
