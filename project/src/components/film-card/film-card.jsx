import React, { useEffect } from 'react'
import { HeaderClassNames } from '../../const/const'
import Header from '../header/header'
import Footer from '../footer/footer'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFilm, getFilmsSimilar } from '../../store/selectors'
import { propFilm } from '../../props/props'
import { fetchFilmsListSimilar } from '../../store/api-actions'
import { Link } from 'react-router-dom'

const FilmCard = (props) => {
	const { film, filmsSimilar, loadingFilmsSimilar } = props
	const {
		name,
		genre,
		released,
		posterImage,
		rating,
		scoresCount,
		description,
		director,
		starring,
		id,
	} = film

	console.log(film)
	console.log(filmsSimilar)

	const starringToString = starring.join(', ')

	useEffect(() => {
		loadingFilmsSimilar(id)
	}, [])

	return (
		<React.Fragment>
			<section className='film-card film-card--full'>
				<div className='film-card__hero'>
					<div className='film-card__bg'>
						<img
							src='img/bg-the-grand-budapest-hotel.jpg'
							alt='The Grand Budapest Hotel'
						/>
					</div>
					<h1 className='visually-hidden'>WTW</h1>

					<Header clHeader={HeaderClassNames.MAIN} />

					<div className='film-card__wrap'>
						<div className='film-card__desc'>
							<h2 className='film-card__title'>{name}</h2>
							<p className='film-card__meta'>
								<span className='film-card__genre'>{genre}</span>
								<span className='film-card__year'>{released}</span>
							</p>

							<div className='film-card__buttons'>
								<button
									className='btn btn--play film-card__button'
									type='button'
								>
									<svg viewBox='0 0 19 19' width='19' height='19'>
										<use xlinkHref='#play-s'></use>
									</svg>
									<span>Play</span>
								</button>
								<button
									className='btn btn--list film-card__button'
									type='button'
								>
									<svg viewBox='0 0 19 20' width='19' height='20'>
										<use xlinkHref='#add'></use>
									</svg>
									<span>My list</span>
								</button>
								<Link
									to={`/films/${id}/review`}
									href='add-review.html'
									className='btn film-card__button'
								>
									Add review
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='film-card__wrap film-card__translate-top'>
					<div className='film-card__info'>
						<div className='film-card__poster film-card__poster--big'>
							<img src={posterImage} alt={name} width='218' height='327' />
						</div>

						<div className='film-card__desc'>
							<nav className='film-nav film-card__nav'>
								<ul className='film-nav__list'>
									<li className='film-nav__item film-nav__item--active'>
										<a href='#' className='film-nav__link'>
											Overview
										</a>
									</li>
									<li className='film-nav__item'>
										<a href='#' className='film-nav__link'>
											Details
										</a>
									</li>
									<li className='film-nav__item'>
										<a href='#' className='film-nav__link'>
											Reviews
										</a>
									</li>
								</ul>
							</nav>

							<div className='film-rating'>
								<div className='film-rating__score'>{rating}</div>
								<p className='film-rating__meta'>
									<span className='film-rating__level'>Very good</span>
									<span className='film-rating__count'>
										{scoresCount} ratings
									</span>
								</p>
							</div>

							<div className='film-card__text'>
								<p>{description}</p>

								<p className='film-card__director'>
									<strong>Director: {director}</strong>
								</p>

								<p className='film-card__starring'>
									<strong>Starring: {starringToString} and other</strong>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className='page-content'>
				<section className='catalog catalog--like-this'>
					<h2 className='catalog__title'>More like this</h2>
					<div className='catalog__films-list'>
						{filmsSimilar.map((filmSm) => (
							<article
								key={filmSm.name + id}
								className='small-film-card catalog__films-card'
							>
								<div className='small-film-card__image'>
									<img
										src={filmSm.previewImage}
										alt={filmSm.name}
										width='280'
										height='175'
									/>
								</div>
								<h3 className='small-film-card__title'>
									<a className='small-film-card__link' href='film-page.html'>
										{filmSm.name}
									</a>
								</h3>
							</article>
						))}
					</div>
				</section>

				<Footer />
			</div>
		</React.Fragment>
	)
}

FilmCard.propTypes = {
	film: PropTypes.shape(propFilm),
	filmsSimilar: PropTypes.arrayOf(PropTypes.shape(propFilm)),
	loadingFilmsSimilar: PropTypes.func.isRequired,
}

const mapStateToProps = (state, { activeId }) => ({
	film: getFilm(state, activeId),
	filmsSimilar: getFilmsSimilar(state),
})

const mapDispatchToProps = (dispatch) => ({
	loadingFilmsSimilar: (id) => dispatch(fetchFilmsListSimilar(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilmCard)
