<template>
    <div style="; z-index:10000000000">
        <div v-if="$store.state.side" @click="$store.state.side = !$store.state.side" id="noside"
            :style="`position:fixed; z-index:10000000000; height: 100%; background: rgba(0, 0, 0, 0.7); z-index: 10; margin-top: 77px; left: 0;width: ${width - 250}px `">
        </div>
        <div v-if="$store.state.side"
            style="z-index: 11;width: 250px; height: 100%;  background: white;right: 0;top:0; margin-top: 77px;position: fixed; overflow: auto;; z-index:10000000000">
            <ul v-if="$store.state.language" class="navbar-nav me-auto mb-2 mb-lg-0" style="text-align: right;">
                <li style="
                                                                                                                    background: #202020;
                                                                                                                    border-radius: 0 0 10px 10px;
                                                                                                                    color: white;
                                                                                                                    padding: 4%;
                                                                                                                    text-align: center;
                                                                                                                "><br>
                    <a v-if="$store.state.isAuthenticated" id="navbarDropdown" role="button" aria-expanded="false">
                        <a style="color: #fed001;float: left;text-align: left ;width: 100%;"><span style="position: relative;
                                                                                                        top: 5px;"
                                class="material-symbols-outlined">
                                person
                            </span> {{ name }}</a>
                        <br><br>
                        <input v-if="balance" class="form-control" style="width: 80%; margin-left: 5px;" type="text"
                            :value="`Balance : ${balance.toFixed(2)}`" name="" id="">
                        <a style="color: #fed001!important;font-size: 10px; text-decoration:underline ;" class="nav-link "
                            href="/charge" id="navbarDropdown" role="button" aria-expanded="false">
                            Charge The Account
                        </a>
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/" id="navbarDropdown" role="button" aria-expanded="false">
                        خانه <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.89729 0.135891C9.18405 -0.0452969 9.54476 -0.0452969 9.83152 0.135891L18.3 5.48674C18.7221 5.75348 18.8552 6.32355 18.5973 6.76002C18.3393 7.1965 17.7879 7.3341 17.3658 7.06737L9.36441 2.01166L1.36304 7.06737C0.940888 7.3341 0.389537 7.1965 0.131558 6.76002C-0.126421 6.32355 0.00666366 5.75348 0.428811 5.48674L8.89729 0.135891Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.91398 8.64407C3.40932 8.64407 3.81087 9.04407 3.81087 9.53749V15.2132H15.2064V9.53749C15.2064 9.04407 15.6079 8.64407 16.1033 8.64407C16.5986 8.64407 17.0001 9.04407 17.0001 9.53749V15.5435C17.0001 16.3479 16.3455 17 15.538 17H3.47923C2.67174 17 2.01709 16.348 2.01709 15.5435V9.53749C2.01709 9.04407 2.41864 8.64407 2.91398 8.64407Z"
                                fill="black" />
                        </svg>

                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        ساخت تصویر <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.2504 5.2531C14.2504 6.08325 13.5775 6.75621 12.7472 6.75621C11.9171 6.75621 11.2441 6.08325 11.2441 5.2531C11.2441 4.42296 11.9171 3.75 12.7472 3.75C13.5775 3.75 14.2504 4.42296 14.2504 5.2531Z"
                                fill="#212121" />
                            <path
                                d="M0 3.75C0 1.67894 1.67894 0 3.75 0H14.25C16.3211 0 18 1.67894 18 3.75V14.25C18 16.3211 16.3211 18 14.25 18H3.75C1.67894 18 0 16.3211 0 14.25V3.75ZM3.75 1.5C2.50735 1.5 1.5 2.50735 1.5 3.75V14.25C1.5 14.5974 1.57872 14.9263 1.7193 15.22L7.19694 9.74249C8.19277 8.74665 9.80734 8.74665 10.8032 9.74249L16.2807 15.22C16.4212 14.9263 16.5 14.5974 16.5 14.25V3.75C16.5 2.50735 15.4926 1.5 14.25 1.5H3.75ZM15.22 16.2807L9.74252 10.8032C9.33246 10.3931 8.66765 10.3931 8.25759 10.8032L2.77999 16.2807C3.07371 16.4212 3.40266 16.5 3.75 16.5H14.25C14.5974 16.5 14.9263 16.4212 15.22 16.2807Z"
                                fill="#212121" />
                        </svg>

                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        ساخت تصویر <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.2504 5.2531C14.2504 6.08325 13.5775 6.75621 12.7472 6.75621C11.9171 6.75621 11.2441 6.08325 11.2441 5.2531C11.2441 4.42296 11.9171 3.75 12.7472 3.75C13.5775 3.75 14.2504 4.42296 14.2504 5.2531Z"
                                fill="#212121" />
                            <path
                                d="M0 3.75C0 1.67894 1.67894 0 3.75 0H14.25C16.3211 0 18 1.67894 18 3.75V14.25C18 16.3211 16.3211 18 14.25 18H3.75C1.67894 18 0 16.3211 0 14.25V3.75ZM3.75 1.5C2.50735 1.5 1.5 2.50735 1.5 3.75V14.25C1.5 14.5974 1.57872 14.9263 1.7193 15.22L7.19694 9.74249C8.19277 8.74665 9.80734 8.74665 10.8032 9.74249L16.2807 15.22C16.4212 14.9263 16.5 14.5974 16.5 14.25V3.75C16.5 2.50735 15.4926 1.5 14.25 1.5H3.75ZM15.22 16.2807L9.74252 10.8032C9.33246 10.3931 8.66765 10.3931 8.25759 10.8032L2.77999 16.2807C3.07371 16.4212 3.40266 16.5 3.75 16.5H14.25C14.5974 16.5 14.9263 16.4212 15.22 16.2807Z"
                                fill="#212121" />
                        </svg>
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a style="" href="/faceswap" v-if="$store.state.isAuthenticated" class="nav-link " id="navbarDropdown"
                        role="button" aria-expanded="false">
                        تغییر چهره<svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.5 0C4.77614 0 5 0.223858 5 0.5C5 0.776142 4.77614 1 4.5 1H2.5C1.67157 1 1 1.67157 1 2.5V4.53113C1 4.80727 0.776142 5.03113 0.5 5.03113C0.223858 5.03113 0 4.80727 0 4.53113V2.5C0 1.11929 1.11929 0 2.5 0H4.5ZM13.5 1C13.2239 1 13 0.776142 13 0.5C13 0.223858 13.2239 0 13.5 0H15.5C16.8807 0 18 1.11929 18 2.5V4.5C18 4.77614 17.7761 5 17.5 5C17.2239 5 17 4.77614 17 4.5V2.5C17 1.67157 16.3284 1 15.5 1H13.5ZM17 13.5C17 13.2239 17.2239 13 17.5 13C17.7761 13 18 13.2239 18 13.5V15.5C18 16.8807 16.8807 18 15.5 18H13.5C13.2239 18 13 17.7761 13 17.5C13 17.2239 13.2239 17 13.5 17H15.5C16.3284 17 17 16.3284 17 15.5V13.5ZM0 13.5C0 13.2239 0.223858 13 0.5 13C0.776142 13 1 13.2239 1 13.5V15.5C1 16.3284 1.67157 17 2.5 17H4.5C4.77614 17 5 17.2239 5 17.5C5 17.7761 4.77614 18 4.5 18H2.5C1.11929 18 0 16.8807 0 15.5V13.5ZM5 5.5C5 5.22386 5.22386 5 5.5 5C5.77614 5 6 5.22386 6 5.5V6.5C6 6.77614 5.77614 7 5.5 7C5.22386 7 5 6.77614 5 6.5V5.5ZM13 5.5C13 5.22386 13.2239 5 13.5 5C13.7761 5 14 5.22386 14 5.5V6.5C14 6.77614 13.7761 7 13.5 7C13.2239 7 13 6.77614 13 6.5V5.5ZM9 5.5C9 5.22386 9.22386 5 9.5 5C9.77614 5 10 5.22386 10 5.5V9.5C10 10.3284 9.32843 11 8.5 11C8.22386 11 8 10.7761 8 10.5C8 10.2239 8.22386 10 8.5 10C8.77614 10 9 9.77614 9 9.5V5.5ZM5.1 12.8C4.93431 12.5791 4.97909 12.2657 5.2 12.1C5.42091 11.9343 5.73431 11.9791 5.9 12.2C6.81097 13.4146 7.83538 14 9 14C10.1646 14 11.189 13.4146 12.1 12.2C12.2657 11.9791 12.5791 11.9343 12.8 12.1C13.0209 12.2657 13.0657 12.5791 12.9 12.8C11.811 14.252 10.502 15 9 15C7.49796 15 6.18903 14.252 5.1 12.8Z"
                                fill="black" />
                        </svg>

                    </a>
                    <a style="" v-else href="/login" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        تغییر چهره<svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.5 0C4.77614 0 5 0.223858 5 0.5C5 0.776142 4.77614 1 4.5 1H2.5C1.67157 1 1 1.67157 1 2.5V4.53113C1 4.80727 0.776142 5.03113 0.5 5.03113C0.223858 5.03113 0 4.80727 0 4.53113V2.5C0 1.11929 1.11929 0 2.5 0H4.5ZM13.5 1C13.2239 1 13 0.776142 13 0.5C13 0.223858 13.2239 0 13.5 0H15.5C16.8807 0 18 1.11929 18 2.5V4.5C18 4.77614 17.7761 5 17.5 5C17.2239 5 17 4.77614 17 4.5V2.5C17 1.67157 16.3284 1 15.5 1H13.5ZM17 13.5C17 13.2239 17.2239 13 17.5 13C17.7761 13 18 13.2239 18 13.5V15.5C18 16.8807 16.8807 18 15.5 18H13.5C13.2239 18 13 17.7761 13 17.5C13 17.2239 13.2239 17 13.5 17H15.5C16.3284 17 17 16.3284 17 15.5V13.5ZM0 13.5C0 13.2239 0.223858 13 0.5 13C0.776142 13 1 13.2239 1 13.5V15.5C1 16.3284 1.67157 17 2.5 17H4.5C4.77614 17 5 17.2239 5 17.5C5 17.7761 4.77614 18 4.5 18H2.5C1.11929 18 0 16.8807 0 15.5V13.5ZM5 5.5C5 5.22386 5.22386 5 5.5 5C5.77614 5 6 5.22386 6 5.5V6.5C6 6.77614 5.77614 7 5.5 7C5.22386 7 5 6.77614 5 6.5V5.5ZM13 5.5C13 5.22386 13.2239 5 13.5 5C13.7761 5 14 5.22386 14 5.5V6.5C14 6.77614 13.7761 7 13.5 7C13.2239 7 13 6.77614 13 6.5V5.5ZM9 5.5C9 5.22386 9.22386 5 9.5 5C9.77614 5 10 5.22386 10 5.5V9.5C10 10.3284 9.32843 11 8.5 11C8.22386 11 8 10.7761 8 10.5C8 10.2239 8.22386 10 8.5 10C8.77614 10 9 9.77614 9 9.5V5.5ZM5.1 12.8C4.93431 12.5791 4.97909 12.2657 5.2 12.1C5.42091 11.9343 5.73431 11.9791 5.9 12.2C6.81097 13.4146 7.83538 14 9 14C10.1646 14 11.189 13.4146 12.1 12.2C12.2657 11.9791 12.5791 11.9343 12.8 12.1C13.0209 12.2657 13.0657 12.5791 12.9 12.8C11.811 14.252 10.502 15 9 15C7.49796 15 6.18903 14.252 5.1 12.8Z"
                                fill="black" />
                        </svg>

                    </a>
                </li>

                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/gpt" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        دستیار هوشمند (Chatgpt)<svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.20449 2.19824C1.43154 2.969 1.0012 4.16569 1.0012 5.88352V10.3705C1.0012 12.5709 1.44694 13.7298 2.18016 14.3696C2.92991 15.0237 4.10921 15.2556 5.90024 15.2556H6.35021C6.57036 15.2556 6.79121 15.3248 6.96965 15.413C7.14623 15.5003 7.33839 15.6345 7.47249 15.8167L8.82055 17.609C9.03688 17.8967 9.28788 18.0016 9.5 18.0016C9.71212 18.0016 9.96312 17.8967 10.1794 17.609L11.5313 15.8117C11.7955 15.465 12.212 15.2556 12.6498 15.2556H13.0998C14.8225 15.2556 16.0226 14.8265 16.7955 14.0557C17.5685 13.285 17.9988 12.0883 17.9988 10.3705V5.88352C17.9988 4.16569 17.5685 2.969 16.7955 2.19824C16.0226 1.42748 14.8225 0.998363 13.0998 0.998363H5.90024C4.17753 0.998363 2.97744 1.42748 2.20449 2.19824ZM1.49653 1.49229C2.52346 0.468269 4.0232 0 5.90024 0H13.0998C14.9768 0 16.4765 0.468269 17.5035 1.49229C18.5304 2.51631 19 4.01179 19 5.88352V10.3705C19 12.2422 18.5304 13.7377 17.5035 14.7617C16.4765 15.7857 14.9768 16.254 13.0998 16.254H12.6498C12.53 16.254 12.407 16.3134 12.3292 16.4148C12.3289 16.4151 12.3287 16.4155 12.3284 16.4158L10.9804 18.2081C10.6028 18.7101 10.0708 19 9.5 19C8.92917 19 8.39723 18.7101 8.01959 18.2081L6.66968 16.4133L6.66531 16.4074C6.65552 16.3939 6.61051 16.3498 6.52497 16.3075C6.44017 16.2656 6.37304 16.254 6.35021 16.254H5.90024C4.09151 16.254 2.57099 16.0372 1.52086 15.1209C0.454197 14.1902 0 12.657 0 10.3705V5.88352C0 4.01179 0.4696 2.51631 1.49653 1.49229Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.6665 8.97222C12.6665 8.68074 12.9014 8.44444 13.1911 8.44444H13.1974C13.4872 8.44444 13.7221 8.68074 13.7221 8.97222C13.7221 9.2637 13.4872 9.5 13.1974 9.5H13.1911C12.9014 9.5 12.6665 9.2637 12.6665 8.97222Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.44482 8.97222C8.44482 8.68074 8.91456 8.44444 9.49401 8.44444H9.50675C10.0862 8.44444 10.5559 8.68074 10.5559 8.97222C10.5559 9.2637 10.0862 9.5 9.50675 9.5H9.49401C8.91456 9.5 8.44482 9.2637 8.44482 8.97222Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5.27783 8.97222C5.27783 8.68074 5.5127 8.44444 5.80243 8.44444H5.80879C6.09852 8.44444 6.33339 8.68074 6.33339 8.97222C6.33339 9.2637 6.09852 9.5 5.80879 9.5H5.80243C5.5127 9.5 5.27783 9.2637 5.27783 8.97222Z"
                                fill="#292D32" />
                        </svg>

                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        دستیار هوشمند (Chatgpt)<svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.20449 2.19824C1.43154 2.969 1.0012 4.16569 1.0012 5.88352V10.3705C1.0012 12.5709 1.44694 13.7298 2.18016 14.3696C2.92991 15.0237 4.10921 15.2556 5.90024 15.2556H6.35021C6.57036 15.2556 6.79121 15.3248 6.96965 15.413C7.14623 15.5003 7.33839 15.6345 7.47249 15.8167L8.82055 17.609C9.03688 17.8967 9.28788 18.0016 9.5 18.0016C9.71212 18.0016 9.96312 17.8967 10.1794 17.609L11.5313 15.8117C11.7955 15.465 12.212 15.2556 12.6498 15.2556H13.0998C14.8225 15.2556 16.0226 14.8265 16.7955 14.0557C17.5685 13.285 17.9988 12.0883 17.9988 10.3705V5.88352C17.9988 4.16569 17.5685 2.969 16.7955 2.19824C16.0226 1.42748 14.8225 0.998363 13.0998 0.998363H5.90024C4.17753 0.998363 2.97744 1.42748 2.20449 2.19824ZM1.49653 1.49229C2.52346 0.468269 4.0232 0 5.90024 0H13.0998C14.9768 0 16.4765 0.468269 17.5035 1.49229C18.5304 2.51631 19 4.01179 19 5.88352V10.3705C19 12.2422 18.5304 13.7377 17.5035 14.7617C16.4765 15.7857 14.9768 16.254 13.0998 16.254H12.6498C12.53 16.254 12.407 16.3134 12.3292 16.4148C12.3289 16.4151 12.3287 16.4155 12.3284 16.4158L10.9804 18.2081C10.6028 18.7101 10.0708 19 9.5 19C8.92917 19 8.39723 18.7101 8.01959 18.2081L6.66968 16.4133L6.66531 16.4074C6.65552 16.3939 6.61051 16.3498 6.52497 16.3075C6.44017 16.2656 6.37304 16.254 6.35021 16.254H5.90024C4.09151 16.254 2.57099 16.0372 1.52086 15.1209C0.454197 14.1902 0 12.657 0 10.3705V5.88352C0 4.01179 0.4696 2.51631 1.49653 1.49229Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.6665 8.97222C12.6665 8.68074 12.9014 8.44444 13.1911 8.44444H13.1974C13.4872 8.44444 13.7221 8.68074 13.7221 8.97222C13.7221 9.2637 13.4872 9.5 13.1974 9.5H13.1911C12.9014 9.5 12.6665 9.2637 12.6665 8.97222Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.44482 8.97222C8.44482 8.68074 8.91456 8.44444 9.49401 8.44444H9.50675C10.0862 8.44444 10.5559 8.68074 10.5559 8.97222C10.5559 9.2637 10.0862 9.5 9.50675 9.5H9.49401C8.91456 9.5 8.44482 9.2637 8.44482 8.97222Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5.27783 8.97222C5.27783 8.68074 5.5127 8.44444 5.80243 8.44444H5.80879C6.09852 8.44444 6.33339 8.68074 6.33339 8.97222C6.33339 9.2637 6.09852 9.5 5.80879 9.5H5.80243C5.5127 9.5 5.27783 9.2637 5.27783 8.97222Z"
                                fill="#292D32" />
                        </svg>

                    </a>
                </li>
                <li @click="gal = !gal" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        گالری<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.00809062 2.73608C0.120892 1.20603 1.39666 0 2.95422 0H16.032C17.6624 0 18.9845 1.32172 18.9863 2.95325L19 16.0405C19 16.0447 18.9999 16.0489 18.9998 16.0532L18.9926 16.2513C18.9925 16.2555 18.9922 16.2597 18.9919 16.2639C18.8791 17.794 17.6033 19 16.0458 19H2.96797C1.33761 19 0.0154633 17.6783 0.0137493 16.0467L1.88456e-07 2.95947C-4.25072e-06 2.95526 6.97355e-05 2.95105 0.00022211 2.94684L0.00739478 2.74875C0.00754775 2.74452 0.00777973 2.7403 0.00809062 2.73608ZM0.684038 2.77985L0.677332 2.96507L0.691074 16.046C0.692395 17.3035 1.71141 18.3222 2.96797 18.3222H16.0458C17.2439 18.3222 18.2261 17.3959 18.316 16.2201L18.3227 16.0349L18.3089 2.95397C18.3076 1.6965 17.2886 0.677815 16.032 0.677815H2.95422C1.75611 0.677815 0.773874 1.6041 0.684038 2.77985Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.49974 0C9.74959 0 9.95213 0.153671 9.95213 0.343234V18.6568C9.95213 18.8463 9.74959 19 9.49974 19C9.2499 19 9.04736 18.8463 9.04736 18.6568V0.343234C9.04736 0.153671 9.2499 0 9.49974 0Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0 9.5C0 9.25016 0.151734 9.04762 0.338908 9.04762H18.6611C18.8483 9.04762 19 9.25016 19 9.5C19 9.74985 18.8483 9.95238 18.6611 9.95238H0.338908C0.151734 9.95238 0 9.74985 0 9.5Z"
                                fill="black" />
                        </svg>

                    </a>
                </li>
                <li v-if="gal" @click="$store.state.side = false" style="margin: 3px 25px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        تصویر ها<svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.00809062 2.73608C0.120892 1.20603 1.39666 0 2.95422 0H16.032C17.6624 0 18.9845 1.32172 18.9863 2.95325L19 16.0405C19 16.0447 18.9999 16.0489 18.9998 16.0532L18.9926 16.2513C18.9925 16.2555 18.9922 16.2597 18.9919 16.2639C18.8791 17.794 17.6033 19 16.0458 19H2.96797C1.33761 19 0.0154633 17.6783 0.0137493 16.0467L1.88456e-07 2.95947C-4.25072e-06 2.95526 6.97355e-05 2.95105 0.00022211 2.94684L0.00739478 2.74875C0.00754775 2.74452 0.00777973 2.7403 0.00809062 2.73608ZM0.684038 2.77985L0.677332 2.96507L0.691074 16.046C0.692395 17.3035 1.71141 18.3222 2.96797 18.3222H16.0458C17.2439 18.3222 18.2261 17.3959 18.316 16.2201L18.3227 16.0349L18.3089 2.95397C18.3076 1.6965 17.2886 0.677815 16.032 0.677815H2.95422C1.75611 0.677815 0.773874 1.6041 0.684038 2.77985Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.49974 0C9.74959 0 9.95213 0.153671 9.95213 0.343234V18.6568C9.95213 18.8463 9.74959 19 9.49974 19C9.2499 19 9.04736 18.8463 9.04736 18.6568V0.343234C9.04736 0.153671 9.2499 0 9.49974 0Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0 9.5C0 9.25016 0.151734 9.04762 0.338908 9.04762H18.6611C18.8483 9.04762 19 9.25016 19 9.5C19 9.74985 18.8483 9.95238 18.6611 9.95238H0.338908C0.151734 9.95238 0 9.74985 0 9.5Z"
                                fill="black" />
                        </svg>

                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        تصویر ها<span style="position: relative; margin-left: 5px;
                                                                                                        top: 5px;"
                            class="material-symbols-outlined">
                            perm_media
                        </span>
                    </a>
                </li>
                <li v-if="gal" @click="$store.state.side = false" style="margin: 3px 25px" class="nav-item ">
                    <a style="" href="/my-faceswap" v-if="$store.state.isAuthenticated" class="nav-link "
                        id="navbarDropdown" role="button" aria-expanded="false">
                        چهره ها<span style="position: relative; margin-left: 5px;
                                                                                                        top: 5px;"
                            class="material-symbols-outlined">
                            switch_account
                        </span>
                    </a>
                    <a style="" v-else href="/login" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        چهره ها<span style="position: relative; margin-left: 5px;
                                                                                                        top: 5px;"
                            class="material-symbols-outlined">
                            switch_account
                        </span>
                    </a>
                </li>
                <li v-if="gal" @click="$store.state.side = false" style="margin: 3px 25px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-gpt" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        چت ها<span style="position: relative; margin-left: 5px;
                                                                                                    top: 5px;"
                            class="material-symbols-outlined">
                            forum
                        </span>
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        چت ها<span style="position: relative; margin-left: 5px;
                                                                                                    top: 5px;"
                            class="material-symbols-outlined">
                            forum
                        </span>
                    </a>
                </li>

                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/charge" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        شارژ حساب<svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 22C4.91765 22 0 17.0824 0 11C0 4.91765 4.91765 0 11 0C17.0824 0 22 4.91765 22 11C22 17.0824 17.0824 22 11 22ZM11 1.29412C5.69412 1.29412 1.29412 5.69412 1.29412 11C1.29412 16.3059 5.69412 20.7059 11 20.7059C16.3059 20.7059 20.7059 16.3059 20.7059 11C20.7059 5.69412 16.3059 1.29412 11 1.29412Z"
                                fill="#202020" />
                            <path
                                d="M11 16.3059C8.80005 16.3059 6.98828 15.0118 6.98828 13.3294C6.98828 12.9412 7.2471 12.6823 7.63534 12.6823C8.02358 12.6823 8.2824 12.9412 8.2824 13.3294C8.2824 14.2353 9.57652 15.0118 11 15.0118C12.4236 15.0118 13.7177 14.2353 13.7177 13.3294C13.7177 12.4235 12.4236 11.6471 11 11.6471C8.80005 11.6471 6.98828 10.3529 6.98828 8.67059C6.98828 6.98823 8.80005 5.69411 11 5.69411C13.2 5.69411 15.0118 6.98823 15.0118 8.67059C15.0118 9.05882 14.753 9.31765 14.3648 9.31765C13.9765 9.31765 13.7177 9.05882 13.7177 8.67059C13.7177 7.7647 12.4236 6.98823 11 6.98823C9.57652 6.98823 8.2824 7.7647 8.2824 8.67059C8.2824 9.57647 9.57652 10.3529 11 10.3529C13.2 10.3529 15.0118 11.6471 15.0118 13.3294C15.0118 15.0118 13.2 16.3059 11 16.3059Z"
                                fill="#202020" />
                            <path
                                d="M11.0001 17.4706C10.6119 17.4706 10.353 17.2118 10.353 16.8235V5.17647C10.353 4.78823 10.6119 4.52941 11.0001 4.52941C11.3883 4.52941 11.6471 4.78823 11.6471 5.17647V16.8235C11.6471 17.2118 11.3883 17.4706 11.0001 17.4706Z"
                                fill="#202020" />
                        </svg>

                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        شارژ حساب<svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 22C4.91765 22 0 17.0824 0 11C0 4.91765 4.91765 0 11 0C17.0824 0 22 4.91765 22 11C22 17.0824 17.0824 22 11 22ZM11 1.29412C5.69412 1.29412 1.29412 5.69412 1.29412 11C1.29412 16.3059 5.69412 20.7059 11 20.7059C16.3059 20.7059 20.7059 16.3059 20.7059 11C20.7059 5.69412 16.3059 1.29412 11 1.29412Z"
                                fill="#202020" />
                            <path
                                d="M11 16.3059C8.80005 16.3059 6.98828 15.0118 6.98828 13.3294C6.98828 12.9412 7.2471 12.6823 7.63534 12.6823C8.02358 12.6823 8.2824 12.9412 8.2824 13.3294C8.2824 14.2353 9.57652 15.0118 11 15.0118C12.4236 15.0118 13.7177 14.2353 13.7177 13.3294C13.7177 12.4235 12.4236 11.6471 11 11.6471C8.80005 11.6471 6.98828 10.3529 6.98828 8.67059C6.98828 6.98823 8.80005 5.69411 11 5.69411C13.2 5.69411 15.0118 6.98823 15.0118 8.67059C15.0118 9.05882 14.753 9.31765 14.3648 9.31765C13.9765 9.31765 13.7177 9.05882 13.7177 8.67059C13.7177 7.7647 12.4236 6.98823 11 6.98823C9.57652 6.98823 8.2824 7.7647 8.2824 8.67059C8.2824 9.57647 9.57652 10.3529 11 10.3529C13.2 10.3529 15.0118 11.6471 15.0118 13.3294C15.0118 15.0118 13.2 16.3059 11 16.3059Z"
                                fill="#202020" />
                            <path
                                d="M11.0001 17.4706C10.6119 17.4706 10.353 17.2118 10.353 16.8235V5.17647C10.353 4.78823 10.6119 4.52941 11.0001 4.52941C11.3883 4.52941 11.6471 4.78823 11.6471 5.17647V16.8235C11.6471 17.2118 11.3883 17.4706 11.0001 17.4706Z"
                                fill="#202020" />
                        </svg>

                    </a>
                </li>

                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/rules" id="navbarDropdown" role="button" aria-expanded="false">
                        قوانین و مقررات<svg width="20" height="24" viewBox="0 0 20 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.20892 4.72671C1.50505 5.27595 1.00125 6.24401 1.00125 7.99396V19.006C1.00125 20.6027 1.49817 21.5834 2.2186 22.1752C2.95275 22.7782 4.00354 23.0476 5.25031 23.0476H14.7497C15.9965 23.0476 17.0472 22.7782 17.7814 22.1752C18.5018 21.5834 18.9987 20.6027 18.9987 19.006V7.99396C18.9987 6.24401 18.4949 5.27595 17.7911 4.72671C17.1557 4.23094 16.2749 4.00921 15.2092 3.96214C14.9641 5.39552 13.653 6.49361 12.078 6.49361H7.92201C7.04754 6.49361 6.25675 6.15732 5.67998 5.60871C5.21794 5.16923 4.89917 4.59915 4.79063 3.96215C3.72499 4.00923 2.84422 4.23097 2.20892 4.72671ZM1.57387 3.99041C2.56815 3.21455 3.89923 3 5.25031 3C5.5268 3 5.75094 3.21319 5.75094 3.47618C5.75094 4.04492 5.99106 4.55775 6.38797 4.93529C6.78489 5.31283 7.32408 5.54125 7.92201 5.54125H12.078C13.2739 5.54125 14.2491 4.6137 14.2491 3.47618C14.2491 3.21319 14.4732 3 14.7497 3C16.1008 3 17.4319 3.21455 18.4261 3.99041C19.4411 4.78239 20 6.07321 20 7.99396V19.006C20 20.7977 19.4342 22.0759 18.4358 22.896C17.4512 23.7047 16.1271 24 14.7497 24H5.25031C3.87289 24 2.54883 23.7047 1.56419 22.896C0.565827 22.0759 0 20.7977 0 19.006V7.99396C0 6.07321 0.558941 4.78239 1.57387 3.99041Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.02108 1.10467C6.88218 1.10467 5.95352 2.18056 5.95352 3.5C5.95352 4.1597 6.18219 4.75454 6.56018 5.19245C6.93817 5.63037 7.45166 5.89533 8.02108 5.89533H11.9789C13.1178 5.89533 14.0465 4.81944 14.0465 3.5C14.0465 2.84032 13.8178 2.24547 13.4398 1.80755C13.0618 1.36962 12.5483 1.10467 11.9789 1.10467H8.02108ZM5 3.5C5 1.57046 6.35557 0 8.02108 0H11.9789C12.8117 0 13.5648 0.390087 14.114 1.02642C14.6633 1.66276 15 2.53519 15 3.5C15 5.42954 13.6444 7 11.9789 7H8.02108C7.1883 7 6.43521 6.60992 5.88594 5.97358C5.33666 5.33723 5 4.46479 5 3.5Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4 13.5C4 13.2239 4.23385 13 4.52231 13H9.47769C9.76616 13 10 13.2239 10 13.5C10 13.7761 9.76616 14 9.47769 14H4.52231C4.23385 14 4 13.7761 4 13.5Z"
                                fill="#292D32" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M4 17.5C4 17.2239 4.2348 17 4.52443 17H14.4756C14.7652 17 15 17.2239 15 17.5C15 17.7761 14.7652 18 14.4756 18H4.52443C4.2348 18 4 17.7761 4 17.5Z"
                                fill="#292D32" />
                        </svg>

                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/contact" id="navbarDropdown" role="button" aria-expanded="false">
                        تماس با ما<svg width="24" height="17" viewBox="0 0 24 17" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M6.08035 5.19837C6.22107 4.98799 6.4981 4.93683 6.69912 5.08409L12 8.96745L17.3009 5.08409C17.5019 4.93683 17.7789 4.98799 17.9196 5.19837C18.0604 5.40875 18.0115 5.69867 17.8105 5.84594L12.2548 9.91595C12.1018 10.028 11.8982 10.028 11.7452 9.91595L6.18955 5.84594C5.98853 5.69867 5.93964 5.40875 6.08035 5.19837Z"
                                fill="black" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.7691 0.918605C1.74939 0.918605 0.922757 1.74152 0.922757 2.75664V14.2434C0.922757 15.2585 1.74939 16.0814 2.7691 16.0814H21.2309C22.2506 16.0814 23.0772 15.2585 23.0772 14.2434V2.75664C23.0772 1.74152 22.2506 0.918605 21.2309 0.918605H2.7691ZM0 2.75664C0 1.23419 1.23977 0 2.7691 0H21.2309C22.7603 0 24 1.2342 24 2.75664V14.2434C24 15.7658 22.7603 17 21.2309 17H2.7691C1.23977 17 0 15.7658 0 14.2434V2.75664Z"
                                fill="black" />
                        </svg>

                    </a>
                </li>
                <hr>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/blog" id="navbarDropdown" role="button" aria-expanded="false">
                        بلاگ<span style="position: relative; margin-left: 5px;
                                                                                                    top: 5px;"
                            class="material-symbols-outlined">
                            rss_feed
                        </span>
                    </a>
                </li>
                <hr>
                <li @click="$store.state.side = false" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/logout" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        خروج<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.5 22C17.299 22 22 17.299 22 11.5C22 5.70101 17.299 1 11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.5 15.7L15.7 11.5L11.5 7.29999" stroke="black" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.30029 11.5H15.7003" stroke="black" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        ورود / ثبت نام
                    </a>
                </li>
                <br>
                <br>
                <br>
                <br>


            </ul>
            <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0" style="text-align: left;">
                <li style="
                                                                                                                    background: #202020;
                                                                                                                    border-radius: 0 0 10px 10px;
                                                                                                                    color: white;
                                                                                                                    padding: 4%;
                                                                                                                    text-align: center;
                                                                                                                "><br>
                    <a v-if="$store.state.isAuthenticated" id="navbarDropdown" role="button" aria-expanded="false">
                        <a style="color: #fed001;float: left;text-align: left ;width: 100%;"><span style="position: relative;
                                                                                                        top: 5px;"
                                class="material-symbols-outlined">
                                person
                            </span> {{ name }}</a>
                        <br><br>
                        <input v-if="balance" class="form-control" style="width: 80%; margin-left: 5px;" type="text"
                            :value="`Balance : ${balance.toFixed(2)}`" name="" id="">
                        <a style="color: #fed001!important;font-size: 10px; text-decoration:underline ;" class="nav-link "
                            href="/charge" id="navbarDropdown" role="button" aria-expanded="false">
                            Charge The Account
                        </a>
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/" id="navbarDropdown" role="button" aria-expanded="false">
                        Home
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Build Image
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Build Image
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-imagine" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Built Images
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Built Images
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a style="" href="/faceswap" v-if="$store.state.isAuthenticated" class="nav-link " id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Face Swap
                    </a>
                    <a style="" v-else href="/login" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        Face Swap
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a style="" href="/my-faceswap" v-if="$store.state.isAuthenticated" class="nav-link "
                        id="navbarDropdown" role="button" aria-expanded="false">
                        Built Faces
                    </a>
                    <a style="" v-else href="/login" class="nav-link " id="navbarDropdown" role="button"
                        aria-expanded="false">
                        Built Faces
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/gpt" id="navbarDropdown" role="button"
                        aria-expanded="false">
                        chatgpt
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        chatgpt
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/my-gpt" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Chats History
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Chats History
                    </a>
                </li>

                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/charge" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Charge The Account
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Charge The Account
                    </a>
                </li>

                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/rules" id="navbarDropdown" role="button" aria-expanded="false">
                        Rules
                    </a>
                </li>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/contact" id="navbarDropdown" role="button" aria-expanded="false">
                        Contact Us
                    </a>
                </li>
                <hr>
                <li @click="$store.state.side = false" style="margin: 3px" class="nav-item ">
                    <a class="nav-link " href="/blog" id="navbarDropdown" role="button" aria-expanded="false">
                        Blog
                    </a>
                </li>
                <hr>
                <li @click="$store.state.side = false" class="nav-item ">
                    <a v-if="$store.state.isAuthenticated" class="nav-link " href="/logout" id="navbarDropdown"
                        role="button" aria-expanded="false">
                        Log Out
                    </a>
                    <a v-else href="/login" class="nav-link " id="navbarDropdown" role="button" aria-expanded="false">
                        Log in / Sign Up
                    </a>
                </li>
                <br>
                <br>
                <br>
                <br>


            </ul>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import login from '../Login2.vue'
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'


export default {
    name: 'navbar',
    props: {
        msg: String
    },
    components: {
        login,
        VueFinalModal
    },
    mounted() {
        this.get_user()
        this.get_balance()
        this.get_width()
    },
    data() {
        return {
            showModal: false,
            name: '',
            width: 0,
            gal: false,
            balance: 0
        }
    },
    methods: {
        get_width() {
            this.width = window.innerWidth
            window.addEventListener('resize', () => {
                this.width = window.innerWidth
            })
        },
        async get_user() {
            await axios
                .get('user')
                .then(response => response.data)
                .then(response => {
                    this.name = response.username
                })
        },
        async get_balance() {
            await axios
                .get(`/charge`)
                .then(response => response.data)
                .then(response => {
                    this.balance = response
                })

        },
        login() {
            this.$store.state.showModal = true
        },
    }
}
</script>
  
<style scoped>
.nav-link {
    color: #444 !important
}

.login-card {
    position: absolute;
    z-index: 101;
    width: 70%;
    left: 15%;
    top: 18%
}


.login-card::-webkit-scrollbar {
    width: 0;
}

@media only screen and (max-width: 500px) {
    .login-card {
        width: 95%;
        left: 2.5%;
        top: 12%
    }
}

.login-card::-webkit-scrollbar {
    width: 0;
}

.nav-item {
    padding: 4%;
}

svg {
    margin-left: 5px;
    width: 26px
}
</style>