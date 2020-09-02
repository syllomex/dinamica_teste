export default function (ref, message, seconds) {
  if (!ref) return;
  ref.current.style.display = "initial";

  if (message) ref.current.innerText = message;

  if (seconds)
    setTimeout(() => {
      ref.current.style.display = "none";
    }, seconds * 1000);
}
