const { BASE_URL } = process.env

export const Endpoints = {
  baseUrl: BASE_URL,
  Images: (path: string) => {
    const base = `${Endpoints.baseUrl}/images`

    return {
      toString: () => base,
      File: (filename: string, extension: string) =>
        `${base}${
          !path.startsWith('/') ? `/${path}` : path
        }/${filename}.${extension}`
    }
  }
}
