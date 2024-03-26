const headerModule = () => {
	const $fnHeaderNavItem = document.querySelectorAll('.fnHeaderNavItem')
	const $fnHeaderItemClose = document.querySelectorAll('.fnHeaderItemClose')
	const $fnHeaderShowSubMenu = document.querySelectorAll('.fnHeaderShowSubMenu')
	const $fnHeaderShowMenu = document.querySelector('.fnHeaderShowMenu')
	const $fnHeaderHideMenu = document.querySelector('.fnHeaderHideMenu')
	const $fnHeaderMenu = document.querySelector('.fnHeaderMenu')
	const $fnButtonActiveToggle = document.querySelectorAll('.fnButtonActiveToggle')
	const $fnNavCountriesItem = document.querySelectorAll('.fnNavCountries a')

	$fnNavCountriesItem.forEach( item => {
		item.addEventListener('mouseenter', () => {
			const positionTop = item.getBoundingClientRect().y - 37
			item.parentNode.style.setProperty('--item-position', positionTop+'px')
		})
	});

	$fnHeaderNavItem.forEach( item => {
		const target = item.parentNode.querySelector('.fnHeaderNavItemTargetImage')
		item.addEventListener('mouseenter', _ => {
			const image = item.getAttribute('data-image')
			target.src = image	
		})
	})

	let activated = null
	$fnButtonActiveToggle.forEach( function(button) {
		button.addEventListener('click', () => {
			const target = button.parentNode
			const isActive = target.classList.contains('-active-')

			activated && activated.classList.remove('-active-')
			if ( isActive ) {
				target.classList.remove('-active-')
				activated = null
			} else {
				target.classList.add('-active-')
				activated = target
			}
		})
	});

	window.addEventListener('click', function(e) {

		if ( activated && !activated.contains(e.target) ) {
			activated.classList.remove('-active-')
			activated = null
		}
		
	})

	mobileFunctions()
	window.addEventListener('resize', mobileFunctions )

	function mobileFunctions() {
		if( window.innerWidth <= 1000 ) {
			$fnHeaderNavItem.forEach( item => {
				item.querySelector('strong').addEventListener('click', function() {
					const target = this.parentNode

					if ( target.classList.contains('-active-') ) {
						target.removeAttribute('style')
						target.classList.remove('-active-')
						return
					}

					const titleHeight = this.offsetHeight
					const links = target.querySelectorAll('.claro-havas-header__principal__nav__block__item__link')
					let newHeight = titleHeight + 15
					links.forEach( link => {
						newHeight += link.offsetHeight
					})
					target.style.setProperty('--height-opened', newHeight+'px')
					target.classList.add('-active-')
				})
			})
			$fnHeaderItemClose.forEach( item => {
				item.addEventListener('click', function() {
					const target = this.closest('.fnHeaderSubMenu')
					target.classList.remove('-active-')
				})
			})
			$fnHeaderShowSubMenu.forEach( item => {
				item.addEventListener('click', function() {
					const target = this.closest('.fnHeaderSubMenu')
					target.classList.add('-active-')
				})
			})
			$fnHeaderShowMenu.addEventListener( 'click', () => { $fnHeaderMenu.classList.add('-active-') })
			$fnHeaderHideMenu.addEventListener( 'click', () => { $fnHeaderMenu.classList.remove('-active-') })
		}
	}	
		
}

headerModule();