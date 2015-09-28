/** @jsx React.DOM */

var React = require('react');

var MallFilter = require('./MallFilter');
var SaleSection = require('./SaleSection');

var GlugrApp = React.createClass({
	getInitialState: function () {
		return { mallId: 1 };
	},
	render: function () {
		return (
			<div className="container">
				<div className="row">
					<div className="12u">
						<MallFilter malls={this.props.malls}/>
					</div>
				</div>
				<div className="row">
					<div className="12u">
						<SaleSection sales={this.props.sales}/>
					</div>
				</div>
				<div className="row">
					<div className="12u">
						<section>
							<header className="major">
								<h2>The Blog</h2>
							</header>
							<div className="row">
								<div className="6u 12u(mobile)">
									<section className="box">
										<a href="#" className="image featured"><img src="images/pic08.jpg" alt="" /></a>
										<header>
											<h3>Magna tempus consequat lorem</h3>
											<p>Posted 45 minutes ago</p>
										</header>
										<p>Lorem ipsum dolor sit amet sit veroeros sed et blandit consequat sed veroeros lorem et blandit  adipiscing feugiat phasellus tempus hendrerit, tortor vitae mattis tempor, sapien sem feugiat sapien, id suscipit magna felis nec elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos lorem ipsum dolor sit amet.</p>
										<footer>
											<ul className="actions">
												<li><a href="#" className="button icon fa-file-text">Continue Reading</a></li>
												<li><a href="#" className="button alt icon fa-comment">33 comments</a></li>
											</ul>
										</footer>
									</section>
								</div>
								<div className="6u 12u(mobile)">
									<section className="box">
										<a href="#" className="image featured"><img src="images/pic09.jpg" alt="" /></a>
										<header>
											<h3>Aptent veroeros et aliquam</h3>
											<p>Posted 45 minutes ago</p>
										</header>
										<p>Lorem ipsum dolor sit amet sit veroeros sed et blandit consequat sed veroeros lorem et blandit  adipiscing feugiat phasellus tempus hendrerit, tortor vitae mattis tempor, sapien sem feugiat sapien, id suscipit magna felis nec elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos lorem ipsum dolor sit amet.</p>
										<footer>
											<ul className="actions">
												<li><a href="#" className="button icon fa-file-text">Continue Reading</a></li>
												<li><a href="#" className="button alt icon fa-comment">33 comments</a></li>
											</ul>
										</footer>
									</section>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = GlugrApp;