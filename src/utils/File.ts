import { readdir, stat } from 'fs/promises'
import { resolve } from 'path'

export default class File {
  public static async requireDirectory (
    directory: string,
    success: (required, filename: string) => void,
    error: (error) => void,
    {
      extensions,
      recursive
    }: { extensions: string | string[]; recursive: boolean } = {
      extensions: ['js', 'ts'],
      recursive: true
    }
  ) {
    const files = await readdir(directory)
    const filesObject = {}

    return Promise.all(
      files.map(async (file) => {
        const path = resolve(directory, file)
        extensions =
          Array.isArray(extensions) && extensions.length
            ? extensions.join('|')
            : extensions

        if (file.match(new RegExp(`\\.(${extensions})$`))) {
          try {
            const { default: required } = await import(path)
            const filename = file.match(/^\w+/)[0]

            if (success) {
              await success(required, filename)
            }

            filesObject[filename] = {
              required,
              filename
            }

            return required
          } catch (_error) {
            error(_error)
          }
        } else if (recursive) {
          const isDirectory = await stat(path).then((file) =>
            file.isDirectory()
          )

          if (isDirectory) {
            return File.requireDirectory(path, success, error, {
              extensions,
              recursive
            })
          }
        }
      })
    ).then(() => filesObject)
  }
}
