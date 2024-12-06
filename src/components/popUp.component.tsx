
/**
 * Fonction qui affiche un message de réussite
 * @param message message de réussite a affiché
 * @returns Une balise de message de réussite
 */
export function PopUpReussite(message : string) {
    return (
        <>
        {
            // Inspirer sur https://flowbite.com/docs/components/alerts/ 
        }
            <div className="fixed flex items-center p-4 mb-4 text-sm text-green-400 border-2 border-green-400 shadow-md bg-slate-700 shadow-green-500">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{message}</span>
                </div>
            </div>
        </>
    );
}

/**
 * Fonction qui affiche un message d'erreur
 * @param message message d'erreur a affiché
 * @returns Un balise avec unmessage d'erreur
 */
export function PopUpEchec(message : string) {
    return (
        <>
        {
            // Inspirer sur https://flowbite.com/docs/components/alerts/ 
        }
            <div className="fixed flex items-center p-4 mb-4 text-sm text-red-400 border-2 border-red-400 shadow-md bg-slate-700 shadow-red-500">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{message}</span>
                </div>
            </div>
        </>
    );

}