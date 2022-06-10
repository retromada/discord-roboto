declare global {
  interface Array {
    random(): any
  }

  interface String {
    capitalize(): string
  }
}

export {}
