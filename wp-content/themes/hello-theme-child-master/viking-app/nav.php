<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="<?php echo site_url() ?>"> <img src="<?php echo site_url() ?>/wp-content/uploads/2021/11/viking-png-1.png"></a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="profile_link">
                <a class="nav-link" href="<?php echo site_url() ?>/vikingdom-web/viking-app/">
                    <i class="fa fa-user"></i>
                    <span class="nav-link-text">Profile</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion">
                    <i class="fa fa-gamepad" aria-hidden="true"></i>
                    <span class="nav-link-text">Play game</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseMulti">
                    <li id="game_1">
                        <a href="<?php echo site_url() ?>/play-game/journey-to-jotunheim/">JOURNEY TO JOTUNHEIM</a>
                    </li>
                    <li id="game_2">
                        <a href="<?php echo site_url() ?>/play-game/adventure-to-niflheim/">ADVENTURE TO NIFLHEIM</a>
                    </li>
                    <li id="game_3">
                        <a href="#">MUSPELHEIM ARENA</a>
                    </li>
                    <li id="game_4">
                        <a href="#">MIDGARD’s LEAGUES</a>
                    </li>
                    <li id="game_4">
                        <a href="#">CLASH OF ASGARDIANS</a>
                    </li>

                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="ntf_market">
                <a class="nav-link" href="#">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span class="nav-link-text">NTF Market</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="pool_token">
                <a class="nav-link" href="#">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                    <span class="nav-link-text">Pool Token</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="claim_token">
                <a class="nav-link" href="#">
                    <i class="fa fa-id-card" aria-hidden="true"></i>
                    <span class="nav-link-text">Claim Token</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseVikingbox" data-parent="#exampleAccordion">
                    <i class="fa " aria-hidden="true"></i>
                    <span class="nav-link-text">Viking Box</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseVikingbox">
                    <li id="open-jotunheim">
                        <a href="<?php echo site_url() ?>/open-egg">Open Egg</a>
                    </li>
                    <li id="open-adventure">
                        <a href="<?php echo site_url() ?>/open-viking-box/">Open Box</a>
                    </li>
                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="rose">
                <a class="nav-link" href="#">
                    <i class="fa fa-handshake-o" aria-hidden="true"></i>
                    <span class="nav-link-text">Rose Affiliate</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Menu Levels">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseBountry" data-parent="#exampleAccordion">
                    <i class="fa fa-gift" aria-hidden="true"></i>
                    <span class="nav-link-text">Bountry</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseBountry">
                    <li id="airdrop_token">
                        <a href="#"><a href="#" class="elementor-sub-item elementor-item-anchor">Airdrop token</a></a>
                    </li>
                    <li id="airdrop_ntf">
                        <a href="#">Airdrop NTF</a>
                    </li>
                    <li id="guest">
                        <a href="#">Guest</a>
                    </li>

                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="rose">
                <a class="nav-link" href="<?php echo site_url() ?>/viking-deposit/">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                    <span class="nav-link-text">Deposit</span>
                </a>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" id="back_home">
                <a class="nav-link" href="<?php echo site_url() ?>">
                    <i class="fa fa-undo" aria-hidden="true"></i>
                    <span class="nav-link-text">Back to home</span>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-angle-left"></i>
                </a>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item btn btn-logout" id="user__logout">
                <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
                    <i class="fa fa-times"></i> Logout</a>
            </li>
        </ul>
    </div>
</nav>