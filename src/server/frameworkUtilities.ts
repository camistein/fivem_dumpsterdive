

export interface Framework {
    name: string
    export: any
}


export const getFramework = (): Framework | null => {
    if((GetResourcePath('qb-core')?.length ?? 0 ) > 0) {
            if(!!global.exports['qb-core'].GetCoreObject) {
                    return {
                        name: 'QBCore',
                        export: global.exports['qb-core'].GetCoreObject()
                    }
            }
    }

    if((GetResourcePath('es_extended')?.length ?? 0 ) > 0) {
        if(!!global.exports['es_extended'].getSharedObject) {
            return {
                name: 'ESX',
                export: global.exports['es_extended'].getSharedObject()
            }
    }
    }

    return null
}