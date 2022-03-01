import { useRouter } from "next/router";

export default function useAuthModal() {
  const router = useRouter();

  function openModal(param) {
    router.push({ query: { [param]: true } }, undefined, { shallow: true });
  }

  function closeModal() {
    router.push({ query: {} }, undefined, { shallow: true });
  }

  return {
    openModal,
    closeModal,
  };
}
