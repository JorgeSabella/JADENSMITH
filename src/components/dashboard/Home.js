import React from 'react'

const Home = () => {
    return (
        <div className = "container">
            <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/UI6lqHOVHic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p className="flow-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent molestie, lectus at ultricies volutpat, metus diam ornare augue, ut porta magna mauris sit amet tellus. Suspendisse dictum leo ac convallis dapibus. Mauris eu leo iaculis, lobortis tellus vel, tempus dolor. Nam a dui sed mauris tincidunt lobortis suscipit in eros. Donec dictum mauris vitae velit vulputate tempor.
            </p>
        </div>
    );
}

export default Home;