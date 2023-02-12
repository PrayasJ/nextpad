import { 
    exists, 
    readTextFile, 
    writeTextFile, 
    BaseDirectory, 
} from '@tauri-apps/api/fs'

import {
    appCacheDir
} from '@tauri-apps/api/path'

export const fileExists  = async (fname: string) => {
    const appCacheDirPath = await appCacheDir()
    console.log({fn: 'exists', fname, dir: appCacheDirPath})
    return await exists(fname, { dir: BaseDirectory.AppCache })
}

export const readFileContent = async (fname: string) => {
    console.log({fn: 'read', fname})
    return await readTextFile(fname, { dir: BaseDirectory.AppCache })
}

export const writeFileContent = async (fname: string, data: string) => {
    console.log({fn: 'write', fname, data})
    await writeTextFile(fname, data, { dir: BaseDirectory.AppCache });
}
