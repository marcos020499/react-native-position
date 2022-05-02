import React from "react";

export default function useFetchPhotoName() {
  const [error, setError] = React.useState(null);

  const fetcher = (formData) =>
    new Promise(async (res) => {
      try {
        const result = await fetch("https://whois.nomada.cloud/upload", {
          method: "POST",
          body: formData,
          headers: {
            Nomada: "MjJhMGM3MzYtNDUzNy00MDE4LWI0ODItY2RhZGQ3N2UzMThh",
          },
        });

        const response = await result.json();

        res(response);
      } catch (e) {
        res(null);
        setError(e);
      }
    });

  return {
    error,
    fetcher,
  };
}
