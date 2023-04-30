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

export const Errors = {
  Command: {
    Requirements: {
      DEVELOPERS_ONLY: 'Only the bot developers can do that.',
      MANAGERS_ONLY: 'Only the bot managers can do that.'
    }
  }
}
