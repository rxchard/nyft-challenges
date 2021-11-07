import { Web3Provider } from '@ethersproject/providers'

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12_000
  return library
}

export async function signMessage(
  library: Web3Provider,
  message: string,
): Promise<string> {
  return library.getSigner().signMessage(message)
}
