const footerModule = () => {

	const $fnFooterShowItem = document.querySelectorAll('.fnFooterShowItem')

	$fnFooterShowItem.forEach( function(item, index) {

		item.addEventListener('click', () => {
			const target = item.parentNode

			if ( target.classList.contains('-active-') ) {
				target.removeAttribute('style')
				target.classList.remove('-active-')
				return
			}

			const items = target.querySelectorAll('.claro-havas-footer__list__item')
			let height = target.offsetHeight + 15

			items.forEach( item => {
				height += item.offsetHeight
			})

			target.style.setProperty('--height-opened', height+'px')
			target.classList.add('-active-')
		})

		

	})

}

footerModule();