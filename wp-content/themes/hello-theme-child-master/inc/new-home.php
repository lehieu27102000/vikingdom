<?php
add_shortcode('home-section', 'homeSection');
function homeSection()
{
    ob_start();
    ?>
    <link rel="stylesheet" type="text/css"
          href="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.min.css"/>
    <link href="<?php echo home_url(); ?>/wp-content/themes/hello-theme-child-master/new-home/assets/css/main.css"
          rel="stylesheet">
    <section class="home-5img">
        <div class="container wow fadeInUp">
            <div class="row justify-content-center">
                <div class="col-20">
                    <div class="el__item">
                        <div class="el__item__thumb">
                            <div class="dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-5img-01.png"
                                     alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-20">
                    <div class="el__item">
                        <div class="el__item__thumb">
                            <div class="dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-5img-02.png"
                                     alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-20">
                    <div class="el__item">
                        <div class="el__item__thumb">
                            <div class="dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-5img-03.png"
                                     alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!--          <div class="col-20">
                           <div class="el__item">
                             <div class="el__item__thumb">
                               <div class="dnfix__thumb -contain">
                                 <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-5img-04.png" alt="">
                               </div>
                             </div>
                           </div>
                         </div>
                         <div class="col-20">
                           <div class="el__item">
                             <div class="el__item__thumb">
                               <div class="dnfix__thumb -contain">
                                 <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-5img-05.png" alt="">
                               </div>
                             </div>
                           </div>
                         </div> -->
            </div>
        </div>
    </section>

    <section class="home-download">
        <div class="container">
            <header class="sc__header -line text-center wow fadeInUp">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3">Download game</h2>
                    <div class="el__line -right wow"></div>
                </div>
            </header>
            <div class="row justify-content-center wow fadeInUp">
                <div class="col-lg-4 col-md-6">
                    <div class="el__item">
                        <a href="<?php echo site_url() ?>\wp-content\themes\hello-theme-child-master\Vikingdom1.0.1.apk" class="el__item__wrap">
                            <div class="el__item__thumb dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/img/chplay.svg"
                                     alt="">
                            </div>
                            <div class="el__item__meta">
                                <div class="el__item__sub">Download from</div>
                                <h3 class="el__item__title">Google play</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="el__item">
                        <a href="<?php echo site_url() ?>\wp-content\themes\hello-theme-child-master\Vikingdom_1.0.2.aab" class="el__item__wrap">
                            <div class="el__item__thumb dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/img/apple.svg"
                                     alt="">
                            </div>
                            <div class="el__item__meta">
                                <div class="el__item__sub">Download from</div>
                                <h3 class="el__item__title">Apple store</h3>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="el__item">
                        <a href="<?php echo site_url() ?>\wp-content\themes\hello-theme-child-master\Vikingdom_1.0.1.zip" class="el__item__wrap">
                            <div class="el__item__thumb dnfix__thumb -contain">
                                <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/img/window.svg"
                                     alt="">
                            </div>
                            <div class="el__item__meta">
                                <div class="el__item__sub">Download from</div>
                                <h3 class="el__item__title">Windows store</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="home-characters -bg-fix">
        <!-- <div class="home-characters__bg"></div> -->
        <div class="el__box">
            <div class="container">
                <header class="sc__header -line text-center wow fadeInUp">

                    <div class="d-flex align-items-center justify-content-center">
                        <div class="el__line -left wow"></div>
                        <h2 class="sc__header__title mx-3">Characters</h2>
                        <div class="el__line -right wow"></div>
                    </div>

                    <div class="sc__header__sub">Earn your character and trade them on the marketplace to make money
                    </div>
                </header>

                <div class="wow fadeInUp">
                    <div class="character__slider flickity"
                         data-flickity='{ "autoPlay": true ,"cellAlign": "left", "contain": true, "wrapAround": true, "pageDots": true,"prevNextButtons": true }'>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Halfdan_the_Black">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-01.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Halfdan the Black</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Bishop_Heahumund">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-02.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Bishop Heahumund</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Ragnar_Lothbrok">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-03.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Ragnar Lothbrok</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="King_Ecbert">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-04.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">King Ecbert</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Prince_Fortress">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-05.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Prince Fortress</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Asni_Ship_Chest">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-06.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Asni Ship Chest</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Leif_Erikson">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-07.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Leif Erikson</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item" id="Olaf_Haraldsson">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-character-08.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item__meta">
                                    <h3 class="el__item__title">Olaf Haraldsson</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="content">
            <div class="box_wrapper">
                <a href="" class="modal_open"><i class="fa fa-book" aria-hidden="true"> </i> READ OUR STORY</a>
            </div>
        </div>
        <div class="el__box">
            <div class="container">
                <header class="sc__header -line text-center wow fadeInUp">

                    <div class="d-flex align-items-center justify-content-center">
                        <div class="el__line -left wow"></div>
                        <h2 class="sc__header__title mx-3">Items</h2>
                        <div class="el__line -right wow"></div>
                    </div>

                    <div class="sc__header__sub">Earn your items and trade them on the marketplace to make money</div>
                </header>
                <div class="wow fadeInUp">
                    <div class="items__slider flickity"
                         data-flickity='{ "autoPlay": true ,"cellAlign": "left", "contain": true, "wrapAround": true, "pageDots": true,"prevNextButtons": true }'>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-01.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Weapons-Hammer I</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-02.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Collection of Viking Helmets</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-03.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Warding Shield</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-04.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Ragnar Lothbrok's hammer</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-05.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Prince Fortress ax</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-06.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Weapons- Large Axe </h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-07.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Medieval Weapons</h3>
                                </div>
                            </div>
                        </div>
                        <div class="slider__item__wrap col-md-20">
                            <div class="el__item2">
                                <div class="el__item2__thumb">
                                    <div class="dnfix__thumb -contain">
                                        <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-items-08.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="el__item2__meta">
                                    <h3 class="el__item2__title">Olaf Haraldsson's hat</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section id="home-how" class="home-how">
        <div class="container" id="howtoplay">
            <div class="row">
                <div class="col-lg-6">
                    <div class="el__item__meta">
                        <header class="sc__header">
                            <div class="d-flex align-items-center">
                                <h2 class="sc__header__title me-3 wow fadeInUp">How to play?</h2>
                                <div class="el__line -right wow"></div>
                            </div>
                            <div class="sc__header__sub wow fadeInDown">Play2earn</div>
                        </header>
                        <div class="el__item__excerpt wow fadeInLeft">
                            Players using VIKER participate in activities such as FLY, RUN, etc. and receive rewards if
                            they win. The process of playing completely depends on the skill of the player, the more you
                            practice, the better you play, the higher your reward. There will be a training mode for
                            you, you will be able to play for unlimited time, but will not receive rewards. If you want
                            to get the bonus, play carefully because you will have limited stamina for each VIKER. When
                            you open the box, you will randomly receive VIKER of different rarity. The levels will be
                            sorted by increasing rarity: common, rare, epic, legendary.
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="el__item__thumb wow fadeInRight">
                        <div class="dnfix__thumb -contain">
                            <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-how-01.png"
                                 alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
    <section id="home-roadmap" class="home-roadmap -bg-fix">
        <!-- <div class="home-roadmap__bg"></div> -->
        <div class="container" id="roadmap">
            <header class="sc__header text-center">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3 wow fadeInUp">Roadmap</h2>
                    <div class="el__line -right wow"></div>
                </div>

                <div class="sc__header__sub wow fadeInDown">Our Roadmap</div>
            </header>
            <div class="roadmap__slider row justify-content-center">
                <div class="slider__item__wrap col-lg-4 col-md-6 d-md-flex wow fadeInUp" data-wow-duration="1s">

                    <div class="el__item">

                        <div class="el__item__meta">
                            <h2 id="item_title"> QIV 2021</h2>
                            <div class="el__item__excerpt">
                                <ul>
                                    <li>Build plot page</li>
                                    <li>Website create</li>
                                    <li>Graphic design</li>
                                    <li>Game development</li>
                                    <li>Complete the game JOURNEY TO JOTUNHEIM</li>
                                    <li>Complete the MUSPELHEIM ARENA</li>
                                    <li>Marketing / Seed Round / Private Sale</li>
                                    <li>Audit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider__item__wrap col-lg-4 col-md-6 d-md-flex wow fadeInUp" data-wow-duration="1.5s">
                    <div class="el__item">
                        <div class="el__item__meta">
                            <h2 id="item_title">QI 2022</h2>
                            <div class="el__item__excerpt">
                                <ul>
                                    <li>Public Sale / Public Launch on DEX</li>
                                    <li>CEX listing</li>
                                    <li>Influencer Marketing</li>
                                    <li>Public Launch NFT Farming</li>
                                    <li>Viking's Item</li>
                                    <li>Launching the marketplace</li>
                                    <li>Expanding Team</li>
                                    <li>Build the game MIDGARD's LEAGUES</li>
                                    <li>Publish games on device platforms: ios, android, window</li>
                                    <li>Officially released the first game</li>
                                    <li>Launch VIKE Staking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider__item__wrap col-lg-4 col-md-6 d-md-flex wow fadeInUp" data-wow-duration="2s">
                    <div class="el__item">
                        <div class="el__item__meta">
                            <h2 id="item_title">QII 2022</h2>
                            <div class="el__item__excerpt">
                                <ul>
                                    <li>Game Studio/Partnerships Expanded</li>
                                    <li>More Exchanges</li>
                                    <li>Complete MIDGARD's LEAGUES</li>
                                    <li>Vikingdom Global Tournament</li>
                                    <li>Improve the customer care department</li>
                                    <li>Officially released the 2nd gamet</li>
                                    <li>Special NFT collection</li>
                                    <li>Creation of fully-fledged leaderboard</li>
                                    <li>Building a DAO system for the ecosystem</li>
                                    <li>Create a Voting DAO system</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider__item__wrap col-lg-4 col-md-6 d-md-flex wow fadeInUp" data-wow-duration="1s">
                    <div class="el__item">
                        <div class="el__item__meta">
                            <h2 id="item_title">QIII 2022</h2>
                            <div class="el__item__excerpt">
                                <ul>
                                    <li>Build the CLASH OF ASGARDIANS game</li>
                                    <li>Build the Metaverse</li>
                                    <li>Focus on marketing through KOL</li>
                                    <li>Organize big tournaments every month</li>
                                    <li>Launching "rent a game player" mode</li>
                                    <li>Officially released the 3rd game</li>
                                    <li>Create NFT Metaverse avatar</li>
                                    <li>Create a DAO system for clans, game guilds</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="slider__item__wrap col-lg-4 col-md-6 d-md-flex wow fadeInUp" data-wow-duration="1.5s">
                    <div class="el__item">
                        <div class="el__item__meta">
                            <h2 id="item_title">QIV 2022</h2>
                            <div class="el__item__excerpt">
                                <ul>
                                    <li>Complete the game CLASH OF ASGARDIANS</li>
                                    <li>Allows players to create NFT items</li>
                                    <li>Launch of utility token used to upgrade items</li>
                                    <li>Upgrade database</li>
                                    <li>Security upgrade</li>
                                    <li>Wide story upgrade</li>
                                    <li>Upgrade game interface</li>
                                    <li>Released many minigames</li>
                                    <li>Build VikingVerse</li>
                                    <li>Officially released the 4th game</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ic-star -star1"></div>
        <div class="ic-star -star2"></div>
    </section>
    <section id="home-token" class="home-token">
        <div class="container" id="tockennomics">
            <header class="sc__header text-center">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3 wow fadeInUp">TOKENOMICS</h2>
                    <div class="el__line -right wow"></div>
                </div>
            </header>
            <div class="sc-content">
                <div class="wow fadeInUp">
                    <div class="el__thumb">
                        <div class="dnfix__thumb -contain">
                            <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-token.png"
                                 alt="">
                        </div>
                    </div>
                </div>
                <div class="el__excerpt wow fadeInUp">
                    The dual chain architecture of BSC allows its users to effectively develop and build their own
                    decentralized apps (dApps) and also digital assets on one blockchain. This is one feature that
                    Vikingdom development targets. Moreover, dApps build on this smart chain can take advantage of this
                    fast trading platform to exchange tokens just as fast between one another.
                </div>
                <div class="home-token__wallet wow fadeInUp">
                    <input type="text" class="form-control" placeholder="Your wallet">
                </div>
            </div>
        </div>
    </section>
    <section class="home-team">
        <div class="container">
            <header class="sc__header text-center">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3 wow fadeInUp">OUR TEAM</h2>
                    <div class="el__line -right wow"></div>
                </div>
            </header>
            <div class="sc-content">
                <div class="row">
                                        <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="1.5s">
                        <a href="<?= site_url() ?>/home-team/cmo.php">
                            <div class="el__item ef--zoomin">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb"><img
                                                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-team-02.png"
                                                alt="" class="img-fluid mx-auto"></div>
                                </div>
                                <div class="el__item__meta">
                                    <p class="el__item__sub ms-auto">Giang Anh- CMO</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="2s">
                        <a href="<?= site_url() ?>/home-team/developer.php">
                            <div class="el__item ef--zoomin">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb"><img
                                                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-team-03.png"
                                                alt="" class="img-fluid mx-auto"></div>
                                </div>
                                <div class="el__item__meta">
                                    <p class="el__item__sub ms-auto">Thien Pham - Developer</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="1s">
                        <a href="<?= site_url() ?>/home-team/ceo.php">
                            <div class="el__item ef--zoomin">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb"><img
                                                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-team-04.png"
                                                alt="" class="img-fluid mx-auto"></div>
                                </div>
                                <div class="el__item__meta">
                                    <p class="el__item__sub ms-auto">Jordan Nguyen - CEO</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-6 col-lg-4 wow fadeInUp front-end-leader" data-wow-duration="1.5s">
                        <a href="<?= site_url() ?>/home-team/front-end-leader.php">
                            <div class="el__item ef--zoomin">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb"><img
                                                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-team-05.png"
                                                alt="" class="img-fluid mx-auto"></div>
                                </div>
                                <div class="el__item__meta">
                                    <p class="el__item__sub ms-auto">Chien Hoang - Front-end leader</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-duration="2s">
                        <a href="<?= site_url() ?>/home-team/art-directer.php">
                            <div class="el__item ef--zoomin">
                                <div class="el__item__thumb">
                                    <div class="dnfix__thumb"><img
                                                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-team-01.png"
                                                alt="" class="img-fluid mx-auto"></div>
                                </div>
                                <div class="el__item__meta">
                                    <p class="el__item__sub ms-auto">Ky Tran - Art Director</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="home-partners">
        <div class="container-full">
            <header class="sc__header text-center">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3 wow fadeInUp">OUR partners</h2>
                    <div class="el__line -right wow"></div>
                </div>
            </header>
            <div class="wow fadeInUp">
                <div class="partners__slider flickity -full"
                     data-flickity='{ "autoPlay": true ,"cellAlign": "center", "contain": true, "wrapAround": true, "pageDots": true,"prevNextButtons": true }'>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-01.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/02/logo1.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2021/10/imgpsh_fullsize_anim-removebg-preview.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-02.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-03.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/02/Logo-AVA-CAPITA.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-04.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-05.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slider__item__wrap">
                        <div class="el__item">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb -contain">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-partners-03.png"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="home-ecosystem -bg-fix">
        <div class="container">
            <header class="sc__header text-center">
                <div class="d-flex align-items-center justify-content-center">
                    <div class="el__line -left wow"></div>
                    <h2 class="sc__header__title mx-3 wow fadeInUp">Ecosystem</h2>
                    <div class="el__line -right wow"></div>
                </div>
            </header>
            <div class="ecosystem__slider flickity -full "
                 data-flickity='{ "autoPlay": true ,"cellAlign": "center", "contain": true, "groupCells": true, "pageDots": true,"prevNextButtons": true }'>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-ecosystem-02.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-ecosystem-03.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-ecosystem-04.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/images/home-ecosystem-04.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/03/image_2022_03_14T13_15_07_821Z.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/03/image_2022_03_15T13_05_32_583Z.png" alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/03/image_2022_03_14T13_13_32_456Z.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-6 slider__item__wrap">
                    <div class="el__item ef--shine">
                        <a href="">
                            <div class="el__item__thumb">
                                <div class="dnfix__thumb">
                                    <img src="<?= site_url() ?>/wp-content/uploads/2022/03/image_2022_03_15T13_05_32_583Z.png"
                                         alt="">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
    </section>
    <div class="modal_box">
        <div class="modal_content">
            <div class="modal_header">
                <i class="fa fa-bookmark" aria-hidden="true"></i> <strong id="title_header"></strong> <i
                        class="fa fa-bookmark" aria-hidden="true"></i>
            </div>
            <div class="modal_body">
                <div id="modal_content"></div>
                <div class="modal_footer">
                    <a href="javascript:void(0);" class="close" href=""><i class="fa fa-window-close"
                                                                           aria-hidden="true"> Close</i></a>
                </div>
            </div>
        </div>
    </div>
        <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript"
                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/libs/flickity/flickity.pkgd.min.js"></script>
        <script type="text/javascript"
                src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/js/wow.min.js"></script>
        <!-- Remember to include jQuery :) -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>

        <!-- jQuery Modal -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"/>
        <script src="<?= site_url() ?>/wp-content/themes/hello-theme-child-master/new-home/assets/js/main.js"></script>
        <script>
            $(function () {
                $(".modal_open").on("click", function (e) {

                    e.preventDefault();
                    $(".modal_content").removeClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $(".modal_box").css('height','500px');
                    $("#title_header").html("Story of Viking characters");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Our.php");
                    return false;   
                });
                $("#Prince_Fortress").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("Prince Fortress");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Prince_Fortress.php");
                    return false;
                });
                $("#Asni_Ship_Chest").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("Asni Ship Chest");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Asni_Ship_Chest.php");
                    return false;
                });
                $("#Leif_Erikson").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("Leif Erikson");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Leif_Erikson.php");
                    return false;
                });
                $("#Halfdan_the_Black").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("Halfdan The Black");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Halfdan_the_Black.php");
                    return false;
                });
                $("#Olaf_Haraldsson").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("Olaf Haraldsson");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Olaf_Haraldsson.php");
                    return false;
                });
                $("#Bishop_Heahumund").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html(" Bishop Heahumund");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Bishop_Heahumund.php");
                    return false;
                });
                $("#Ragnar_Lothbrok").on("click", function (e) {
                    e.preventDefault();
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html(" Ragnar Lothbrok");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/Ragnar_Lothbrok.php");
                    return false;
                });
                $("#King_Ecbert").on("click", function (e) {
                    e.preventDefault();

                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_content").addClass('modal_content_chrt');
                    $(".modal_box").addClass('active');
                    $("#title_header").html("King Ecbert");
                    $("#modal_content").load("<?php echo site_url() ?>/wp-content/themes/hello-theme-child-master/inc/King_Ecbert.php");
                    return false;
                });
                $(".close").on("click", function () {
                    $(".modal_box").removeClass('active');
                    return false;
                });
            });
        </script>
    <?php
    $out = ob_get_clean();
    echo $out;
}